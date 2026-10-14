"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(search.trim())}`;
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="container-layout flex h-14 items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-black text-brand">掘</span>
          <span className="text-lg font-bold tracking-wide">TechHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {[
            { href: "/", label: "首页" },
            { href: "/tags", label: "标签" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                pathname === item.href
                  ? "text-brand"
                  : "hover:bg-[var(--hover)]"
              }`}
              style={{ color: pathname === item.href ? "#1e80ff" : "var(--text)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <form onSubmit={submitSearch} className="hidden sm:block relative w-64">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索文章、标签"
            className="w-full rounded-md border px-3 py-1.5 text-sm outline-none transition-colors focus:border-brand"
            style={{
              backgroundColor: "var(--hover)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          />
        </form>

        <button
          onClick={toggleDark}
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--hover)]"
          aria-label="切换主题"
        >
          {dark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path
                d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <Link
          href="/write"
          className="btn-primary shrink-0"
          onClick={(e) => {
            if (!user) {
              e.preventDefault();
              router.push("/login?redirect=/write");
            }
          }}
        >
          <span className="mr-1">+</span>写文章
        </Link>

        {user ? (
          <div className="relative shrink-0">
            <button onClick={() => setShowMenu((v) => !v)} className="block">
              <img
                src={user.avatar}
                alt={user.nickname}
                className="w-8 h-8 rounded-full border"
                style={{ borderColor: "var(--border)" }}
              />
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                <div
                  className="absolute right-0 top-10 w-40 py-1 rounded-md shadow-lg z-20 border"
                  style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
                >
                  <Link
                    href="/profile"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 text-sm hover:bg-[var(--hover)]"
                  >
                    个人主页
                  </Link>
                  <Link
                    href="/write"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 text-sm hover:bg-[var(--hover)]"
                  >
                    写文章
                  </Link>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      logout();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-[var(--hover)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    退出登录
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link href="/login" className="btn-outline shrink-0 text-sm">
            登录
          </Link>
        )}
      </div>
    </header>
  );
}
