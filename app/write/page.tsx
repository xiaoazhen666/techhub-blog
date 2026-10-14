"use client";

import { useState } from "react";
import { categories } from "@/lib/data";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("frontend");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!title.trim() || !content.trim()) {
      alert("请填写标题和正文内容");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container-layout mt-6">
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-xl font-bold mb-2">发布成功！</h1>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            你的文章《{title}》已提交（当前为演示环境，未真实落库）
          </p>
          <button className="btn-primary" onClick={() => { setSubmitted(false); setTitle(""); setContent(""); setTags(""); }}>
            再写一篇
          </button>
        </div>
      </div>
    );
  }

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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border p-3 text-sm outline-none transition-colors focus:border-brand"
                style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text)" }}
              >
                {categories.filter((c) => c.id !== "recommend").map((c) => (
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
            <button className="btn-outline">保存草稿</button>
            <button onClick={submit} className="btn-primary">发布文章</button>
          </div>
        </div>
      </div>
    </div>
  );
}
