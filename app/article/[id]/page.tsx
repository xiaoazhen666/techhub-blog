import { getArticle, articles } from "@/lib/data";
import { notFound } from "next/navigation";
import ArticleDetail from "./ArticleDetail";

export function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

export default function Page({ params }: { params: { id: string } }) {
  const article = getArticle(params.id);
  if (!article) notFound();
  return <ArticleDetail article={article} />;
}
