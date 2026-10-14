"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCreateArticle, apiGetCategories } from "@/lib/api";
import { Category } from "@/lib/types";

export default function WritePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login?redirect=/write");
      return;
    }
    apiGetCategories().then((list) => {
      setCategories(list);
      if (list.length > 0) setCategoryId(list[0].id);
    });
  }, [router]);

  const submit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("请填写标题和正文内容");
      return;
    }
    if (!categoryId) {
      alert("请选择分类");
      return;
    }
    setSubmitting(true);
    try {
      const tagList = tags
        .split(/[,，]/)
        .map((t) => t.trim())
        .filter(Boolean);
      await apiCreateArticle({
        title: title.trim(),
        summary: content.trim().slice(0, 100),
        content: content.trim(),
        categoryId,
        tags: tagList,
      });
      alert("发布成功！");
      router.push("/");
    } catch (e: any) {
      alert(e.message || "发布失败，请先登录");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-layout mt-6 max-w-3xl">
      <div className="card p-6 md:p-8">
        <h1 className="text-xl font-bold mb-6">写文章</h1>

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
            <label className="text-sm font-medium mb-2 block">正文</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="支持 Markdown 语法，开始你的创作吧..."
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
