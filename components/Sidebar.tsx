"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGetTags } from "@/lib/api";
import { Tag } from "@/lib/types";

export default function Sidebar() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    apiGetTags().then(setTags).catch(() => {});
  }, []);

  return (
    <aside className="space-y-4">
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
