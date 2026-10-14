"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGetCategories, apiGetTags } from "@/lib/api";
import { Category, Tag } from "@/lib/types";

export default function Sidebar() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    apiGetTags().then((list) => {
      // 按文章数降序，取前 12 个
      const sorted = [...list].sort((a, b) => (b.articleCount ?? 0) - (a.articleCount ?? 0)).slice(0, 12);
      setTags(sorted);
    }).catch(() => {});

    apiGetCategories().then(setCategories).catch(() => {});
  }, []);

  return (
    <aside className="space-y-4">
      {/* 分类导航 */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">📂 分类</h3>
        <div className="flex flex-col gap-1">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.id}`}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-sm transition-colors hover:bg-brand-light"
              style={{ color: "var(--text-secondary)" }}
            >
              <span>{c.name}</span>
              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                {c.articleCount ?? 0}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 热门标签 */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">🏷️ 热门标签</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="px-2.5 py-1 text-xs rounded-md transition-colors hover:bg-brand-light"
              style={{ backgroundColor: "var(--hover)", color: "var(--text-secondary)" }}
            >
              {tag.name}
              <span style={{ color: "var(--text-tertiary)" }}>（{tag.articleCount ?? 0}）</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 关于 */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">ℹ️ 关于 TechHub</h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          一个专注于技术分享的社区平台，覆盖前端、后端、人工智能、开发工具等多个领域。欢迎每一位热爱技术的你，在这里记录成长、分享经验。
        </p>
      </div>
    </aside>
  );
}
