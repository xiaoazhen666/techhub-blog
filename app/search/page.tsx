"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { articles, authors, tags } from "@/lib/data";

function SearchContent() {
  const params = useSearchParams();
  const q = params.get("q") || "";

  const filtered = articles.filter((a) => {
    const author = authors.find((au) => au.id === a.authorId);
    return (
      a.title.toLowerCase().includes(q.toLowerCase()) ||
      a.summary.toLowerCase().includes(q.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())) ||
      author?.name.toLowerCase().includes(q.toLowerCase())
    );
  });

  return (
    <div className="container-layout mt-6">
      <h1 className="text-xl font-bold mb-4">
        搜索 “{q}” 的结果 <span className="text-sm font-normal" style={{ color: "var(--text-tertiary)" }}>{filtered.length} 条</span>
      </h1>
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((a) => <ArticleCard key={a.id} article={a} />)
        ) : (
          <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>
            没有找到相关文章，换个关键词试试吧
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-layout mt-6">搜索中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
