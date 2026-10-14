import { Article, Comment } from "@/lib/types";
import { formatDate, formatNumber, getAuthor, getCommentsByArticle } from "@/lib/data";
import ArticleDetailClient from "./ArticleDetailClient";

export default function ArticleDetail({ article }: { article: Article }) {
  const author = getAuthor(article.authorId)!;
  const comments = getCommentsByArticle(article.id);

  return (
    <div className="container-layout mt-6 flex gap-6">
      <article className="flex-1 min-w-0">
        <div className="card p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug mb-4">
            {article.title}
          </h1>

          {/* 作者信息 */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b" style={{ borderColor: "var(--border)" }}>
            <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="text-sm font-medium">{author.name}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                {author.level} · {formatDate(article.createdAt)} · {formatNumber(article.views)} 阅读
              </div>
            </div>
            <button className="btn-primary text-sm">+ 关注</button>
          </div>

          {/* 正文 */}
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{
              __html: article.content
                .split("\n\n")
                .map((block) => {
                  if (block.startsWith("## ")) return `<h2>${block.slice(3)}</h2>`;
                  return `<p>${block}</p>`;
                })
                .join(""),
            }}
          />
        </div>

        {/* 点赞评论栏 */}
        <ArticleDetailClient article={article} comments={comments} />
      </article>

      {/* 右侧目录 */}
      <aside className="hidden xl:block w-64 shrink-0">
        <div className="card p-4 sticky top-20">
          <h3 className="text-sm font-bold mb-3">目录</h3>
          <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            {article.content
              .split("\n\n")
              .filter((b) => b.startsWith("## "))
              .map((b, i) => (
                <div key={i} className="hover:text-brand cursor-pointer transition-colors">
                  {b.slice(3)}
                </div>
              ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
