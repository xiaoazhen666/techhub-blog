"use client";

import { Suspense, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { categories, getArticlesByCategory } from "@/lib/data";

function HomeContent() {
  const [active, setActive] = useState("recommend");
  const list = getArticlesByCategory(active);

  return (
    <div className="container-layout mt-6 flex gap-6">
      <div className="flex-1 min-w-0">
        {/* 分类 Tab */}
        <div className="card p-1 mb-4 flex overflow-x-auto">
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
        <div className="space-y-4">
          {list.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block w-72 shrink-0">
        <Sidebar />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="container-layout mt-6">加载中...</div>}>
      <HomeContent />
    </Suspense>
  );
}
