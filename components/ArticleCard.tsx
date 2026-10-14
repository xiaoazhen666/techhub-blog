import Link from "next/link";
import { Article } from "@/lib/types";
import { formatDate, formatNumber, getAuthor } from "@/lib/data";

export default function ArticleCard({ article }: { article: Article }) {
  const author = getAuthor(article.authorId);
  return (
    <div className="card p-5 transition-shadow hover:shadow-cardHover cursor-pointer group">
      <Link href={`/article/${article.id}`} className="block">
        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            {article.isPinned && (
              <span className="inline-block text-xs text-brand font-medium mb-2">
                ⭐ 置顶
              </span>
            )}
            {article.isHot && !article.isPinned && (
              <span className="inline-block text-xs text-orange-500 font-medium mb-2">
                🔥 热门
              </span>
            )}
            <h3 className="text-base font-bold leading-snug mb-2 line-clamp-2 group-hover:text-brand transition-colors">
              {article.title}
            </h3>
            <p
              className="text-sm leading-relaxed line-clamp-2 mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              {article.summary}
            </p>
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
              {author && (
                <span className="flex items-center gap-1.5">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-5 h-5 rounded-full"
                  />
                  <span style={{ color: "var(--text-secondary)" }}>{author.name}</span>
                </span>
              )}
              <span>{formatDate(article.createdAt)}</span>
              <span className="flex items-center gap-1">
                <EyeIcon />
                {formatNumber(article.views)}
              </span>
              <span className="flex items-center gap-1">
                <LikeIcon />
                {formatNumber(article.likes)}
              </span>
              <span className="flex items-center gap-1">
                <CommentIcon />
                {formatNumber(article.comments)}
              </span>
            </div>
          </div>
          {article.cover && (
            <div className="hidden sm:block w-32 h-20 rounded-lg overflow-hidden shrink-0">
              <img
                src={article.cover}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function LikeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
    </svg>
  );
}
function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}
