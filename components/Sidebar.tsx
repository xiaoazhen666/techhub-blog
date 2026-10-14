import Link from "next/link";
import { authors, tags } from "@/lib/data";
import { formatNumber } from "@/lib/data";

export default function Sidebar() {
  return (
    <aside className="space-y-4">
      {/* 作者榜 */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">🎖️ 作者榜</h3>
        <div className="space-y-3">
          {authors.slice(0, 5).map((author, i) => (
            <div key={author.id} className="flex items-center gap-3">
              <span
                className={`w-5 text-center text-sm font-bold ${
                  i < 3 ? "text-orange-500" : ""
                }`}
                style={{ color: i < 3 ? "#ff7d00" : "var(--text-tertiary)" }}
              >
                {i + 1}
              </span>
              <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{author.name}</div>
                <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  {author.level} · {formatNumber(author.followers)} 关注
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 热门标签 */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">🏷️ 热门标签</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="px-2.5 py-1 text-xs rounded-md transition-colors hover:bg-brand-light"
              style={{ backgroundColor: "var(--hover)", color: "var(--text-secondary)" }}
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 关于 */}
      <div className="card p-4">
        <h3 className="text-sm font-bold mb-3">ℹ️ 关于 TechHub</h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          一个专注于技术分享的社区平台，覆盖前端、后端、人工智能、开发工具等多个领域。欢迎每一位热爱技术的你，在这里记录成长、分享经验。
        </p>
      </div>
    </aside>
  );
}
