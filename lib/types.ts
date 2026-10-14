export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  level: string;
  followers: number;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  cover?: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  isPinned?: boolean;
  isHot?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorId: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  level: string;
  followers: number;
  following: number;
  likes: number;
  articles: number;
}
