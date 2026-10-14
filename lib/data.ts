import { Article, Author, Category, Comment, Tag } from "./types";

export const categories: Category[] = [
  { id: "recommend", name: "推荐" },
  { id: "frontend", name: "前端" },
  { id: "backend", name: "后端" },
  { id: "android", name: "Android" },
  { id: "ios", name: "iOS" },
  { id: "ai", name: "人工智能" },
  { id: "devtools", name: "开发工具" },
  { id: "code", name: "代码人生" },
  { id: "read", name: "阅读" },
];

export const authors: Author[] = [
  {
    id: "u1",
    name: "字节前端团队",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=bytedance",
    bio: "专注前端工程化与性能优化",
    level: "Lv5",
    followers: 128000,
  },
  {
    id: "u2",
    name: "小码哥",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=xiaomage",
    bio: "后端工程师，热爱分布式系统",
    level: "Lv4",
    followers: 54000,
  },
  {
    id: "u3",
    name: "算法酱",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=algo",
    bio: "LeetCode 刷题达人",
    level: "Lv6",
    followers: 98000,
  },
  {
    id: "u4",
    name: "AI 前沿",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=ai",
    bio: "分享大模型与机器学习实战",
    level: "Lv5",
    followers: 156000,
  },
  {
    id: "u5",
    name: "架构师老王",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=arch",
    bio: "十年架构经验，聊聊高并发",
    level: "Lv7",
    followers: 210000,
  },
];

export const tags: Tag[] = [
  { id: "t1", name: "React" },
  { id: "t2", name: "Vue" },
  { id: "t3", name: "Java" },
  { id: "t4", name: "Spring Boot" },
  { id: "t5", name: "算法" },
  { id: "t6", name: "大模型" },
  { id: "t7", name: "性能优化" },
  { id: "t8", name: "设计模式" },
  { id: "t9", name: "Docker" },
  { id: "t10", name: "数据库" },
];

const md = (title: string, body: string) =>
  `## ${title}\n\n${body}\n\n${body}\n\n## 总结\n\n${body}`;

export const articles: Article[] = [
  {
    id: "a1",
    title: "2026 前端工程化趋势：从 Vite 到 Turbopack 的演进之路",
    summary:
      "构建工具在过去一年发生了剧烈变化。本文梳理了 Vite、Turbopack、Rspack 三大构建引擎的核心差异，并结合实际项目给出选型建议。",
    content: md(
      "为什么构建工具又卷起来了",
      "随着项目规模的增长，传统的 Webpack 冷启动和热更新速度已经难以满足大型项目的开发体验需求。Rust 生态的崛起为构建工具带来了新的可能，Turbopack 和 Rspack 正是在这一背景下诞生的。本文将从原理出发，对比三者的性能表现和生态成熟度。"
    ),
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    authorId: "u1",
    categoryId: "frontend",
    tags: ["React", "性能优化"],
    views: 12500,
    likes: 856,
    comments: 132,
    createdAt: "2026-10-12T08:00:00Z",
    isHot: true,
  },
  {
    id: "a2",
    title: "深入理解 JVM 内存模型：从堆栈到 GC 的完整链路",
    summary:
      "很多同学对 JVM 内存区域的认知停留在八股文层面。本文通过一个真实的内存泄漏案例，带你完整走一遍 JVM 内存模型与垃圾回收的底层逻辑。",
    content: md(
      "从一个内存泄漏说起",
      "线上服务突然频繁 Full GC，排查半天发现是本地缓存没有设置过期时间导致的堆内存持续增长。这个案例引出了 JVM 内存模型的完整知识体系：堆、栈、方法区各自的作用，以及不同 GC 算法的适用场景。"
    ),
    authorId: "u2",
    categoryId: "backend",
    tags: ["Java", "性能优化"],
    views: 9800,
    likes: 621,
    comments: 98,
    createdAt: "2026-10-11T10:30:00Z",
    isHot: true,
  },
  {
    id: "a3",
    title: "刷了 500 道题后，我总结的算法学习方法论",
    summary:
      "算法学习不是盲目刷题。本文分享一套可复用的学习路径：从基础数据结构到高频题型分类，再到面试场景的刻意练习。",
    content: md(
      "别急着刷题",
      "很多初学者一上来就闷头刷 LeetCode，结果刷了三个月还是不会做中等题。问题在于没有建立知识框架。正确的方法应该是先吃透数组、链表、树、图这些基础数据结构，再按题型分类攻克双指针、滑动窗口、动态规划等高频考点。"
    ),
    authorId: "u3",
    categoryId: "code",
    tags: ["算法"],
    views: 21000,
    likes: 2300,
    comments: 456,
    createdAt: "2026-10-10T14:00:00Z",
    isPinned: true,
  },
  {
    id: "a4",
    title: "大模型应用落地：RAG 检索增强生成的工程实践",
    summary:
      "RAG 是目前企业级大模型应用最主流的落地方式。本文从文档切分、向量化、召回排序到生成，完整拆解一个可用的 RAG 系统。",
    content: md(
      "RAG 为什么火",
      "通用大模型存在知识陈旧和幻觉问题，而企业数据又有隐私和实时性要求。RAG 通过外挂知识库的方式，在不大规模微调的前提下解决了这些问题，成为当前性价比最高的落地路线。"
    ),
    authorId: "u4",
    categoryId: "ai",
    tags: ["大模型"],
    views: 15600,
    likes: 1100,
    comments: 210,
    createdAt: "2026-10-09T09:00:00Z",
    isHot: true,
  },
  {
    id: "a5",
    title: "Spring Boot 3 实战：响应式编程与 WebFlux 全解析",
    summary:
      "WebFlux 和传统的 Spring MVC 到底该怎么选？本文通过压测数据说话，给出响应式编程在企业中的真实适用边界。",
    content: md(
      "响应式的真实价值",
      "响应式编程并非银弹。对于 IO 密集型的网关类服务，WebFlux 能显著降低线程开销；但对于 CPU 密集型的业务逻辑，传统 MVC 反而更简单可控。本文用压测数据告诉你什么时候该上 WebFlux。"
    ),
    authorId: "u5",
    categoryId: "backend",
    tags: ["Java", "Spring Boot"],
    views: 8800,
    likes: 540,
    comments: 76,
    createdAt: "2026-10-08T16:20:00Z",
  },
  {
    id: "a6",
    title: "从零构建一个高性能缓存系统：Redis 深度实践",
    summary:
      "缓存击穿、缓存穿透、缓存雪崩，这些经典问题你真的能准确区分并给出解决方案吗？本文带你从原理到代码彻底掌握 Redis 缓存设计。",
    content: md(
      "三大缓存问题",
      "缓存穿透可以通过布隆过滤器或空值缓存解决，缓存击穿需要互斥锁或逻辑过期，缓存雪崩则需要分布式锁和过期时间打散。三者成因不同，方案也不同，本文逐一拆解。"
    ),
    authorId: "u2",
    categoryId: "backend",
    tags: ["数据库", "性能优化"],
    views: 7200,
    likes: 430,
    comments: 64,
    createdAt: "2026-10-07T11:00:00Z",
  },
  {
    id: "a7",
    title: "React 19 新特性前瞻：Actions 与 Compiler 会改变什么",
    summary:
      "React 19 带来了 Server Actions、use() 钩子和自动记忆化 Compiler。这些新特性会如何影响我们的日常开发？",
    content: md(
      "React 19 的变化",
      "从 use() 到 Server Actions，React 19 正在把数据获取和状态管理进一步简化。自动记忆化 Compiler 则有望让 useMemo、useCallback 成为历史。本文前瞻这些特性带来的开发模式变革。"
    ),
    authorId: "u1",
    categoryId: "frontend",
    tags: ["React"],
    views: 13200,
    likes: 920,
    comments: 145,
    createdAt: "2026-10-06T09:30:00Z",
  },
  {
    id: "a8",
    title: "程序员如何高效阅读源码：以 Spring 为例",
    summary:
      "读源码是进阶的必经之路，但很多人不得其法。本文分享一套从入口切入、抓主干、画图辅助的源码阅读方法论。",
    content: md(
      "读源码的正确姿势",
      "不要一上来就逐行读，而是先明确要解决什么问题，再顺着调用链从入口往下追。借助 IDE 的断点调试和类图工具，能大幅提升阅读效率。本文以 Spring 的 IoC 容器初始化为例演示完整流程。"
    ),
    authorId: "u5",
    categoryId: "backend",
    tags: ["Java", "设计模式"],
    views: 6400,
    likes: 380,
    comments: 52,
    createdAt: "2026-10-05T15:00:00Z",
  },
  {
    id: "a9",
    title: "一文搞懂 Docker 容器网络原理与最佳实践",
    summary:
      "Bridge、Host、Overlay，各种网络模式让人眼花缭乱。本文用清晰的示意图和实验，讲透容器网络的底层原理。",
    content: md(
      "容器网络初探",
      "Docker 的网络模式本质上是在回答一个问题：容器如何与宿主机、其他容器以及外部世界通信。本文从 namespace 和 veth 设备讲起，逐步深入到各种网络模式的适用场景。"
    ),
    authorId: "u5",
    categoryId: "devtools",
    tags: ["Docker"],
    views: 5900,
    likes: 350,
    comments: 48,
    createdAt: "2026-10-04T10:00:00Z",
  },
  {
    id: "a10",
    title: "AI 辅助编程工具的现状与未来：Copilot 之后的下一步",
    summary:
      "从代码补全到智能体，AI 编程工具正在快速进化。本文盘点了当前主流工具的能力边界，并展望未来五年的发展方向。",
    content: md(
      "AI 编程演进",
      "早期的 AI 编程工具只能做简单的代码补全，如今已经能理解整个代码库上下文并完成复杂重构。智能体时代的到来，将让 AI 从辅助者变成协作者。本文梳理这条演进脉络。"
    ),
    authorId: "u4",
    categoryId: "ai",
    tags: ["大模型"],
    views: 18700,
    likes: 1450,
    comments: 320,
    createdAt: "2026-10-03T08:30:00Z",
    isHot: true,
  },
];

export const comments: Comment[] = [
  {
    id: "c1",
    articleId: "a1",
    authorId: "u2",
    content: "总结得很到位，Turbopack 的生态还需要时间，现阶段 Vite 依然是首选。",
    likes: 45,
    createdAt: "2026-10-12T10:00:00Z",
  },
  {
    id: "c2",
    articleId: "a1",
    authorId: "u3",
    content: "我们团队已经在用 Rspack 了，冷启动确实快了很多，就是插件生态还要适配。",
    likes: 23,
    createdAt: "2026-10-12T11:30:00Z",
  },
  {
    id: "c3",
    articleId: "a3",
    authorId: "u5",
    content: "方法论很重要，但更重要的是坚持。框架只是帮你少走弯路。",
    likes: 67,
    createdAt: "2026-10-10T15:00:00Z",
  },
  {
    id: "c4",
    articleId: "a4",
    authorId: "u1",
    content: "RAG 的文档切分策略确实是效果的关键，chunk 大小影响很大。",
    likes: 31,
    createdAt: "2026-10-09T12:00:00Z",
  },
];

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getArticlesByCategory(categoryId: string): Article[] {
  if (categoryId === "recommend") return articles;
  return articles.filter((a) => a.categoryId === categoryId);
}

export function getCommentsByArticle(articleId: string): Comment[] {
  return comments.filter((c) => c.articleId === articleId);
}

export function formatNumber(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "w";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

export function formatDate(iso: string): string {
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
