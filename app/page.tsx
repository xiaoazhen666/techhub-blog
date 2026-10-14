"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { apiGetArticles, apiGetCategories } from "@/lib/api";
import { Article, Category } from "@/lib/types";

export default function Home() {
  const [active, setActive] = useState<number>(0); // 0 表示"推荐"（全部）
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
    apiGetArticles({ categoryId: active || undefined, page: 0, size: 20 })
      .then((res) => setArticles(res.content))
      .catch((e) => setError(e.message || "加载文章失败"))
      .finally(() => setLoading(false));
  }, [active, refresh]);

  return (
    <div className="container-layout mt-6 flex gap-6">
      <div className="flex-1 min-w-0">
        {/* 分类 Tab */}
        <div className="card p-1 mb-4 flex overflow-x-auto">
          <button
            onClick={() => setActive(0)}
            className="shrink-0 px-4 py-2 text-sm rounded-md transition-colors whitespace-nowrap"
            style={{
              color: active === 0 ? "#1e80ff" : "var(--text-secondary)",
              backgroundColor: active === 0 ? "var(--brand-light, #eaf2ff)" : "transparent",
              fontWeight: active === 0 ? 600 : 400,
            }}
          >
            推荐
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className="shrink-0 px-4 py-2 text-sm rounded-md transition-colors whitespace-nowrap"
              style={{
                color: active === c.id ? "#1e80ff" : "var(--text-secondary)",
                backgroundColor: active === c.id ? "var(--brand-light, #eaf2ff)" : "transparent",
                fontWeight: active === c.id ? 600 : 400,
              }}
            >
              {c.name}
            </button>
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
