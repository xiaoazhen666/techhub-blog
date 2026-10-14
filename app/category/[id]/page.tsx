"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { apiGetArticles, apiGetCategories } from "@/lib/api";
import { Article, Category } from "@/lib/types";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = Number(params.id);
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categoryId) return;
    // 找到分类名称
    apiGetCategories()
      .then((list) => {
        const found = list.find((c) => c.id === categoryId);
        setCategory(found || null);
      })
      .catch(() => {});

    setLoading(true);
    setError("");
    apiGetArticles({ categoryId, page: 0, size: 50 })
      .then((res) => setArticles(res.content))
      .catch((e) => setError(e.message || "加载失败"))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <div className="container-layout mt-6">
      <div className="mb-4">
        <Link href="/" className="text-sm hover:underline" style={{ color: "var(--text-tertiary)" }}>
          ← 返回首页
        </Link>
        <h1 className="text-xl font-bold mt-2">
          {category?.name || "分类"}{" "}
          <span className="text-sm font-normal" style={{ color: "var(--text-tertiary)" }}>
            {loading ? "加载中..." : `${articles.length} 篇文章`}
          </span>
        </h1>
        {category?.description && (
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            {category.description}
          </p>
        )}
      </div>

      {loading ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>加载中...</div>
      ) : error ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>{error}</div>
      ) : articles.length === 0 ? (
        <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>该分类下暂无文章</div>
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
