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
      <h1 className="text-xl font-bold mb-6">标签广场</h1>
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
              className="card p-4 hover:shadow-cardHover transition-shadow"
            >
              <div className="text-base font-bold text-brand">#{tag.name}</div>
              <div className="text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>
                点击查看相关文章
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
