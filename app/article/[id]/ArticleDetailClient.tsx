"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Article, Comment } from "@/lib/types";
import { apiGetComments, apiCreateComment, apiLikeArticle, formatDate, formatNumber } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function ArticleDetailClient({ article }: { article: Article }) {
  const router = useRouter();
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(article.likes);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGetComments(article.id)
      .then((res) => setComments(res.content))
      .catch(() => {})
      .finally(() => setLoadingComments(false));
  }, [article.id]);

  const toggleLike = () => {
    if (liked) return;
    apiLikeArticle(article.id)
      .then(() => {
        setLiked(true);
        setLikes(likes + 1);
      })
      .catch(() => {});
  };

  const submitComment = () => {
    if (!user) {
      router.push(`/login?redirect=/article/${article.id}`);
      return;
    }
    if (!commentText.trim() || submitting) return;
    setSubmitting(true);
    setError("");
    apiCreateComment(article.id, commentText.trim())
      .then((c) => {
        setComments([c, ...comments]);
        setCommentText("");
      })
      .catch((e) => setError(e.message || "评论失败"))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="space-y-4 mt-4">
      {/* 操作栏 */}
      <div className="card p-4 flex items-center gap-6">
        <button
          onClick={toggleLike}
          className="flex items-center gap-2 text-sm transition-colors"
          style={{ color: liked ? "#1e80ff" : "var(--text-secondary)" }}
        >
          <LikeIcon filled={liked} />
          <span>{formatNumber(likes)}</span>
        </button>
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          <CommentIcon />
          <span>{comments.length}</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-tertiary)" }}>
          <EyeIcon />
          <span>{formatNumber(article.views)}</span>
        </div>
      </div>

      {/* 评论区 */}
      <div className="card p-6">
        <h3 className="text-base font-bold mb-4">评论 {comments.length}</h3>
        <div className="flex gap-3 mb-6">
          <img
            src={user?.avatar || "https://api.dicebear.com/7.x/identicon/svg?seed=guest"}
            alt="我"
            className="w-9 h-9 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={user ? "友善评论，理性发言" : "登录后即可评论"}
              className="w-full rounded-md border p-3 text-sm outline-none resize-none h-20 transition-colors focus:border-brand"
              style={{
                backgroundColor: "var(--hover)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
            {error && (
              <div className="text-xs mt-2" style={{ color: "#ef4444" }}>{error}</div>
            )}
            <div className="flex justify-end mt-2">
              <button onClick={submitComment} disabled={submitting} className="btn-primary text-sm">
                {user ? (submitting ? "发布中..." : "发布评论") : "登录后评论"}
              </button>
            </div>
          </div>
        </div>

        {loadingComments ? (
          <div className="text-center py-8 text-sm" style={{ color: "var(--text-tertiary)" }}>
            加载评论中...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-sm" style={{ color: "var(--text-tertiary)" }}>
            暂无评论，来抢沙发～
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <img src={c.userAvatar} alt={c.userName} className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
                    <span className="font-medium" style={{ color: "var(--text)" }}>{c.userName}</span>
                    <span>{formatDate(c.createdAt)}</span>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LikeIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
    </svg>
  );
}
function CommentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
