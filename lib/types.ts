// 与后端 Spring Boot 返回结构对齐的类型定义

export interface Author {
  id: number;
  name: string;
  avatar: string;
  bio?: string;
  level?: string;
  followers?: number;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  cover?: string;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  categoryId?: number;
  categoryName?: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  pinned?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Comment {
  id: number;
  articleId?: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface PageResult<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  bio?: string;
  level?: string;
}
