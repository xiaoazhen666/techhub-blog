"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { apiSearchArticles } from "@/lib/api";
import { Article } from "@/lib/types";

function SearchContent() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!q) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    apiSearchArticles(q)
      .then((res) => setArticles(res.content))
      .catch((e) => setError(e.message || "搜索失败"))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="container-layout mt-6">
      <h1 className="text-xl font-bold mb-4">
        搜索 “{q}” 的结果{" "}
        <span className="text-sm font-normal" style={{ color: "var(--text-tertiary)" }}>
          {loading ? "搜索中..." : `${articles.length} 条`}
        </span>
      </h1>
      {loading ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>搜索中...</div>
      ) : error ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>{error}</div>
      ) : articles.length > 0 ? (
        <div className="space-y-4">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>
          没有找到相关文章，换个关键词试试吧
        </div>
      )}
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
