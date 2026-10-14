// 后端 API 对接层
//
// 当前前端使用本地 mock 数据（lib/data.ts）直接渲染，
// 后端 Spring Boot 已完整实现（见 ../backend）。
//
// 接入真实后端时：
// 1. 将后端部署地址填入 BASE_URL
// 2. 在页面中把 lib/data.ts 的调用替换为本文件对应的 fetch 方法
// 3. 登录后 token 存 localStorage，请求时带 Authorization 头

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
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

// 认证
export const apiRegister = (body: { username: string; password: string; nickname?: string }) =>
  request("/api/auth/register", { method: "POST", body: JSON.stringify(body) });

export const apiLogin = (body: { username: string; password: string }) =>
  request("/api/auth/login", { method: "POST", body: JSON.stringify(body) });

// 文章
export const apiGetArticles = (params?: { categoryId?: number; page?: number; size?: number; sort?: string }) => {
  const q = new URLSearchParams();
  if (params?.categoryId) q.set("categoryId", String(params.categoryId));
  if (params?.page != null) q.set("page", String(params.page));
  if (params?.size != null) q.set("size", String(params.size));
  if (params?.sort) q.set("sort", params.sort);
  const qs = q.toString();
  return request(`/api/articles${qs ? "?" + qs : ""}`);
};

export const apiGetArticle = (id: number) => request(`/api/articles/${id}`);

export const apiSearchArticles = (keyword: string) =>
  request(`/api/articles/search?keyword=${encodeURIComponent(keyword)}`);

export const apiCreateArticle = (body: unknown) =>
  request("/api/articles", { method: "POST", body: JSON.stringify(body) });

export const apiLikeArticle = (id: number) =>
  request(`/api/articles/${id}/like`, { method: "POST" });

// 评论
export const apiGetComments = (articleId: number) =>
  request(`/api/comments/article/${articleId}`);

export const apiCreateComment = (articleId: number, content: string) =>
  request(`/api/comments/article/${articleId}`, { method: "POST", body: JSON.stringify({ content }) });

// 分类 & 标签
export const apiGetCategories = () => request("/api/categories");
export const apiGetTags = () => request("/api/tags");
