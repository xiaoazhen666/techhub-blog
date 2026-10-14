"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGetTags } from "@/lib/api";
import { Tag } from "@/lib/types";

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetTags()
      .then(setTags)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-layout mt-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold">标签广场</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          共 {tags.length} 个标签，点击查看相关文章
        </p>
      </div>
      {loading ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>加载中...</div>
      ) : tags.length === 0 ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>暂无标签</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="card p-5 hover:shadow-cardHover transition-shadow group"
            >
              <div className="flex items-center justify-between">
                <div className="text-base font-bold text-brand group-hover:underline">
                  #{tag.name}
                </div>
              </div>
              <div className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                {tag.articleCount ?? 0} 篇文章
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
