// 后端 API 对接层
import { Article, Category, Comment, PageResult, Tag } from "./types";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const json = (await res.json()) as ApiResponse<T>;
  if (json.code !== 200) {
    throw new Error(json.message || "请求失败");
  }
  return json.data;
}

// ===== 认证 =====
export const apiRegister = (body: {
  username: string;
  password: string;
  nickname?: string;
}) =>
  request<{ token: string; userId: number; username: string; nickname: string; avatar: string }>(
    "/api/auth/register",
    { method: "POST", body: JSON.stringify(body) }
  );

export const apiLogin = (body: { username: string; password: string }) =>
  request<{ token: string; userId: number; username: string; nickname: string; avatar: string }>(
    "/api/auth/login",
    { method: "POST", body: JSON.stringify(body) }
  );

// ===== 文章 =====
export const apiGetArticles = (params?: {
  categoryId?: number;
  page?: number;
  size?: number;
  sort?: string;
}) => {
  const q = new URLSearchParams();
  if (params?.categoryId && params.categoryId > 0)
    q.set("categoryId", String(params.categoryId));
  if (params?.page != null) q.set("page", String(params.page));
  if (params?.size != null) q.set("size", String(params.size));
  if (params?.sort) q.set("sort", params.sort);
  const qs = q.toString();
  return request<PageResult<Article>>(`/api/articles${qs ? "?" + qs : ""}`);
};

export const apiGetArticle = (id: number) =>
  request<Article>(`/api/articles/${id}`);

export const apiSearchArticles = (keyword: string, page = 0, size = 20) =>
  request<PageResult<Article>>(
    `/api/articles/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`
  );

export const apiGetArticlesByTag = (tagName: string, page = 0, size = 20) =>
  request<PageResult<Article>>(
    `/api/articles/tag/${encodeURIComponent(tagName)}?page=${page}&size=${size}`
  );

export const apiCreateArticle = (body: {
  title: string;
  summary?: string;
  content: string;
  cover?: string;
  categoryId: number;
  tags?: string[];
}) => request<Article>("/api/articles", { method: "POST", body: JSON.stringify(body) });

export const apiLikeArticle = (id: number) =>
  request(`/api/articles/${id}/like`, { method: "POST" });

// ===== 评论 =====
export const apiGetComments = (articleId: number, page = 0, size = 50) =>
  request<PageResult<Comment>>(
    `/api/comments/article/${articleId}?page=${page}&size=${size}`
  );

export const apiCreateComment = (articleId: number, content: string) =>
  request<Comment>(`/api/comments/article/${articleId}`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });

// ===== 分类 & 标签 =====
export const apiGetCategories = async (): Promise<Category[]> => {
  const raw = await request<any[]>("/api/categories");
  // 后端分类带了 articles 列表，这里剥离成纯分类
  return raw.map((c) => ({ id: c.id, name: c.name, description: c.description }));
};

export const apiGetTags = async (): Promise<Tag[]> => {
  const raw = await request<any[]>("/api/tags");
  return raw.map((t) => ({ id: t.id, name: t.name }));
};

// ===== 工具函数 =====
export function formatNumber(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "w";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const day = 24 * 60 * 60 * 1000;
  if (diff < 60 * 1000) return "刚刚";
  if (diff < 60 * 60 * 1000) return Math.floor(diff / (60 * 1000)) + " 分钟前";
  if (diff < day) return Math.floor(diff / (60 * 60 * 1000)) + " 小时前";
  if (diff < 7 * day) return Math.floor(diff / day) + " 天前";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}
