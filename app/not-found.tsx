import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-layout mt-16 flex flex-col items-center justify-center text-center">
      <div className="text-6xl font-black" style={{ color: "var(--text-tertiary)" }}>404</div>
      <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>页面走丢了</p>
      <Link href="/" className="btn-primary mt-6">返回首页</Link>
    </div>
  );
}
