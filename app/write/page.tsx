"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCreateArticle, apiGetCategories } from "@/lib/api";
import { Category } from "@/lib/types";
import { useAuth } from "@/lib/auth";

export default function WritePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const list = await apiGetCategories();
      setCategories(list);
      if (list.length > 0) setCategoryId(list[0].id);
    } catch (e: any) {
      setError("分类加载失败，请稍后重试");
      console.error("加载分类失败:", e);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/write");
    }
  }, [user, loading, router]);

  const submit = async () => {
    if (!title.trim() || !content.trim()) {
      setError("请填写标题和正文内容");
      return;
    }
    if (!categoryId) {
      setError("请选择分类");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const tagList = tags
        .split(/[,，]/)
        .map((t) => t.trim())
        .filter(Boolean);
      await apiCreateArticle({
        title: title.trim(),
        summary: summary.trim() || content.trim().slice(0, 100),
        content: content.trim(),
        categoryId,
        tags: tagList,
      });
      router.push("/");
    } catch (e: any) {
      setError(e.message || "发布失败，请先登录");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="container-layout mt-16 text-center" style={{ color: "var(--text-tertiary)" }}>
        加载中...
      </div>
    );
  }

  return (
    <div className="container-layout mt-6 max-w-3xl">
      <div className="card p-6 md:p-8">
        <h1 className="text-xl font-bold mb-6">写文章</h1>

        {error && (
          <div className="mb-4 p-3 rounded-md text-sm bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block">标题</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入文章标题..."
              className="w-full rounded-md border p-3 text-base outline-none transition-colors focus:border-brand"
              style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">分类</label>
              {loadingCategories ? (
                <div className="w-full rounded-md border p-3 text-sm" style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text-tertiary)" }}>
                  分类加载中...
                </div>
              ) : categories.length === 0 ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md border p-3 text-sm" style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text-tertiary)" }}>
                    暂无分类
                  </div>
                  <button onClick={loadCategories} className="btn-outline px-3 py-3 text-sm whitespace-nowrap">
                    重试
                  </button>
                </div>
              ) : (
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  className="w-full rounded-md border p-3 text-sm outline-none transition-colors focus:border-brand"
                  style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text)" }}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">标签（逗号分隔）</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="如：Java, Spring Boot"
                className="w-full rounded-md border p-3 text-sm outline-none transition-colors focus:border-brand"
                style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text)" }}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">摘要（选填，不填自动截取正文）</label>
            <input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="一句话概括文章内容..."
              className="w-full rounded-md border p-3 text-sm outline-none transition-colors focus:border-brand"
              style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">正文（支持 Markdown 语法）</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="开始你的创作吧...支持 ## 标题、**加粗**、列表等 Markdown 语法"
              className="w-full rounded-md border p-4 text-sm outline-none resize-y min-h-80 leading-relaxed transition-colors focus:border-brand"
              style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button className="btn-outline" onClick={() => router.push("/")}>取消</button>
            <button onClick={submit} disabled={submitting} className="btn-primary">
              {submitting ? "发布中..." : "发布文章"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
