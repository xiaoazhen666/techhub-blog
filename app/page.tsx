"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { apiGetArticles, apiGetCategories } from "@/lib/api";
import { Article, Category } from "@/lib/types";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    apiGetCategories()
      .then(setCategories)
      .catch(() => setError("加载分类失败"));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    apiGetArticles({ page: 0, size: 20 })
      .then((res) => setArticles(res.content))
      .catch((e) => setError(e.message || "加载文章失败"))
      .finally(() => setLoading(false));
  }, [refresh]);

  return (
    <div className="container-layout mt-6 flex gap-6">
      <div className="flex-1 min-w-0">
        {/* 分类 Tab */}
        <div className="card p-1 mb-4 flex overflow-x-auto">
          <button
            className="shrink-0 px-4 py-2 text-sm rounded-md transition-colors whitespace-nowrap"
            style={{
              color: "#1e80ff",
              backgroundColor: "var(--brand-light, #eaf2ff)",
              fontWeight: 600,
            }}
          >
            推荐
          </button>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.id}`}
              className="shrink-0 px-4 py-2 text-sm rounded-md transition-colors whitespace-nowrap hover:bg-brand-light"
              style={{ color: "var(--text-secondary)" }}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* 文章列表 */}
        {loading ? (
          <div className="card p-16 text-center" style={{ color: "var(--text-tertiary)" }}>
            加载中...
          </div>
        ) : error ? (
          <div className="card p-16 text-center" style={{ color: "var(--text-tertiary)" }}>
            {error}
            <button
              onClick={() => setRefresh((v) => v + 1)}
              className="block mx-auto mt-3 text-sm text-brand hover:underline"
            >
              点击重试
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="card p-16 text-center" style={{ color: "var(--text-tertiary)" }}>
            暂无文章
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>

      <div className="hidden lg:block w-72 shrink-0">
        <Sidebar />
      </div>
    </div>
  );
}
