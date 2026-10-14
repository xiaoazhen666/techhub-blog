import ArticleCard from "@/components/ArticleCard";
import { articles, formatNumber } from "@/lib/data";

export default function ProfilePage() {
  const mine = articles.filter((_, i) => i % 3 === 0);
  return (
    <div className="container-layout mt-6">
      {/* 个人信息卡 */}
      <div className="card p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <img
            src="https://api.dicebear.com/7.x/identicon/svg?seed=me"
            alt="头像"
            className="w-20 h-20 rounded-full border"
            style={{ borderColor: "var(--border)" }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">我的昵称</h1>
              <span className="text-xs px-2 py-0.5 rounded bg-brand-light text-brand">Lv1</span>
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              这个人很懒，还没有填写个人简介
            </p>
          </div>
          <div className="flex gap-6 text-center">
            {[
              { label: "关注", value: 0 },
              { label: "粉丝", value: 0 },
              { label: "获赞", value: 0 },
              { label: "文章", value: mine.length },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-lg font-bold">{formatNumber(s.value)}</div>
                <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 我的文章 */}
      <h2 className="text-base font-bold mb-4">我的文章</h2>
      <div className="space-y-4">
        {mine.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
