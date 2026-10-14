"use client";

import { useState } from "react";
import { Article, Comment } from "@/lib/types";
import { formatDate, formatNumber, getAuthor } from "@/lib/data";

export default function ArticleDetailClient({
  article,
  comments: initialComments,
}: {
  article: Article;
  comments: Comment[];
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(article.likes);
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const submitComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: "c" + Date.now(),
      articleId: article.id,
      authorId: "me",
      content: commentText.trim(),
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setComments([newComment, ...comments]);
    setCommentText("");
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
      </div>

      {/* 评论区 */}
      <div className="card p-6">
        <h3 className="text-base font-bold mb-4">评论 {comments.length}</h3>
        <div className="flex gap-3 mb-6">
          <img
            src="https://api.dicebear.com/7.x/identicon/svg?seed=me"
            alt="我"
            className="w-9 h-9 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="友善评论，理性发言"
              className="w-full rounded-md border p-3 text-sm outline-none resize-none h-20 transition-colors focus:border-brand"
              style={{
                backgroundColor: "var(--hover)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
            <div className="flex justify-end mt-2">
              <button onClick={submitComment} className="btn-primary text-sm">
                发布评论
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((c) => {
            const ca = getAuthor(c.authorId);
            return (
              <div key={c.id} className="flex gap-3">
                <img
                  src={ca?.avatar || "https://api.dicebear.com/7.x/identicon/svg?seed=me"}
                  alt={ca?.name || "我"}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
                    <span className="font-medium" style={{ color: "var(--text)" }}>
                      {ca?.name || "我"}
                    </span>
                    <span>{formatDate(c.createdAt)}</span>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed">{c.content}</p>
                </div>
              </div>
            );
          })}
        </div>
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
