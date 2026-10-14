"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="mt-16 border-t py-8"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="container-layout flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div style={{ color: "var(--text-tertiary)" }}>
          TechHub · 一个专注技术分享的社区
        </div>
        <div className="flex gap-4" style={{ color: "var(--text-tertiary)" }}>
          <Link href="/" className="hover:text-brand">
            关于我们
          </Link>
          <Link href="/" className="hover:text-brand">
            联系我们
          </Link>
          <Link href="/" className="hover:text-brand">
            用户协议
          </Link>
        </div>
      </div>
    </footer>
  );
}
