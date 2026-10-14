"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { apiGetArticlesByTag } from "@/lib/api";
import { Article } from "@/lib/types";

export default function TagPage() {
  const params = useParams();
  const tag = decodeURIComponent(String(params.tag));
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tag) return;
    setLoading(true);
    setError("");
    apiGetArticlesByTag(tag)
      .then((res) => setArticles(res.content))
      .catch((e) => setError(e.message || "加载失败"))
      .finally(() => setLoading(false));
  }, [tag]);

  return (
    <div className="container-layout mt-6">
      <h1 className="text-xl font-bold mb-4">
        #{tag}{" "}
        <span className="text-sm font-normal" style={{ color: "var(--text-tertiary)" }}>
          {loading ? "加载中..." : `${articles.length} 篇文章`}
        </span>
      </h1>
      {loading ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>加载中...</div>
      ) : error ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>{error}</div>
      ) : articles.length === 0 ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>该标签下暂无文章</div>
      ) : (
        <div className="space-y-4">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
