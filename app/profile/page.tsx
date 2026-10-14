"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { apiGetMyArticles } from "@/lib/api";
import { Article } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";
import { formatNumber } from "@/lib/api";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoadingArticles(true);
    apiGetMyArticles()
      .then((res) => setArticles(res.content))
      .catch(() => {})
      .finally(() => setLoadingArticles(false));
  }, [user]);

  if (loading) {
    return (
      <div className="container-layout mt-16 text-center" style={{ color: "var(--text-tertiary)" }}>
        加载中...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-layout mt-16 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4">👤</div>
        <h1 className="text-xl font-bold mb-2">尚未登录</h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          登录后即可查看个人主页、发布文章和评论
        </p>
        <Link href="/login?redirect=/profile" className="btn-primary">去登录 / 注册</Link>
      </div>
    );
  }

  return (
    <div className="container-layout mt-6 max-w-3xl">
      {/* 用户信息卡片 */}
      <div className="card p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <img
            src={user.avatar}
            alt="头像"
            className="w-20 h-20 rounded-full border"
            style={{ borderColor: "var(--border)" }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">{user.nickname || user.username}</h1>
              {user.level && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: "var(--brand-light, #eaf2ff)", color: "#1e80ff" }}
                >
                  {user.level}
                </span>
              )}
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              @{user.username}
            </p>
            {user.bio && (
              <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                {user.bio}
              </p>
            )}
            <div className="flex gap-6 mt-4 text-sm">
              <div>
                <span className="font-bold">{formatNumber(user.followers ?? 0)}</span>
                <span className="ml-1" style={{ color: "var(--text-tertiary)" }}>粉丝</span>
              </div>
              <div>
                <span className="font-bold">{formatNumber(user.following ?? 0)}</span>
                <span className="ml-1" style={{ color: "var(--text-tertiary)" }}>关注</span>
              </div>
              <div>
                <span className="font-bold">{formatNumber(user.likes ?? 0)}</span>
                <span className="ml-1" style={{ color: "var(--text-tertiary)" }}>获赞</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/write" className="btn-primary">写文章</Link>
            <button onClick={logout} className="btn-outline">退出登录</button>
          </div>
        </div>
      </div>

      {/* 我的文章 */}
      <div>
        <h2 className="text-base font-bold mb-4">我的文章（{articles.length}）</h2>
        {loadingArticles ? (
          <div className="card p-12 text-center" style={{ color: "var(--text-tertiary)" }}>加载中...</div>
        ) : articles.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              还没有发布文章，去 <Link href="/write" className="text-brand hover:underline">写文章</Link> 发表你的第一篇作品吧
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
