# TechHub 前端

基于 Next.js 14 + Tailwind CSS 的技术博客社区前端，掘金风格 UI。

## 技术栈

- Next.js 14（App Router）
- React 18
- Tailwind CSS 3
- TypeScript

## 功能

- 首页信息流 + 分类 Tab（推荐/前端/后端/AI 等）
- 文章详情页（正文排版 + 右侧目录 + 评论）
- 站内搜索
- 标签广场 + 标签详情
- 个人主页
- 写文章页面
- 点赞、评论（交互演示）
- 深色/浅色主题切换
- 响应式布局

## 本地开发

```bash
npm install
npm run dev
# 访问 http://localhost:3000
```

## 构建

```bash
npm run build
npm run start
```

## 当前数据来源

前端目前使用本地 mock 数据（`lib/data.ts`），可独立运行和预览。

后端已提供完整的 Spring Boot 服务（见 `../backend`），
后续接入真实接口时，只需在 `lib/api.ts` 中替换数据源即可。

## 部署到 Vercel

1. 将 `frontend` 目录推送到 GitHub 仓库
2. 在 [vercel.com](https://vercel.com) 导入该仓库
3. 框架自动识别为 Next.js，无需额外配置，直接 Deploy

部署后会得到一个 `https://xxx.vercel.app` 的可访问链接。
