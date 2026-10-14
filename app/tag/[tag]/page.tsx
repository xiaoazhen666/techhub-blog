import ArticleCard from "@/components/ArticleCard";
import { articles, tags } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return tags.map((t) => ({ tag: t.name }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const list = articles.filter((a) => a.tags.includes(tag));

  if (list.length === 0) notFound();

  return (
    <div className="container-layout mt-6">
      <h1 className="text-xl font-bold mb-4">
        #{tag} <span className="text-sm font-normal" style={{ color: "var(--text-tertiary)" }}>{list.length} 篇文章</span>
      </h1>
      <div className="space-y-4">
        {list.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    </div>
  );
}
