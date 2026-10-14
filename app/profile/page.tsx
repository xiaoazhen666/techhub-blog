"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AuthInfo {
  userId: number;
  username: string;
  nickname: string;
  avatar: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<AuthInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      if (u) setUser(u);
    } catch {}
  }, []);

  if (!user) {
    return (
      <div className="container-layout mt-16 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4">👤</div>
        <h1 className="text-xl font-bold mb-2">尚未登录</h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          登录后即可查看个人主页、发布文章和评论
        </p>
        <Link href="/login" className="btn-primary">去登录 / 注册</Link>
      </div>
    );
  }

  return (
    <div className="container-layout mt-6">
      <div className="card p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <img
            src={user.avatar}
            alt="头像"
            className="w-20 h-20 rounded-full border"
            style={{ borderColor: "var(--border)" }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{user.nickname || user.username}</h1>
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              用户名：{user.username}
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="btn-outline"
          >
            退出登录
          </button>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-bold mb-4">我的文章</h2>
        <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>
          去 <Link href="/write" className="text-brand hover:underline">写文章</Link> 发布你的第一篇作品吧
        </div>
      </div>
    </div>
  );
}
