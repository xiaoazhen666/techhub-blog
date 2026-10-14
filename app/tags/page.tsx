import Link from "next/link";
import { tags, articles } from "@/lib/data";

export default function TagsPage() {
  return (
    <div className="container-layout mt-6">
      <h1 className="text-xl font-bold mb-6">标签广场</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tags.map((tag) => {
          const count = articles.filter((a) => a.tags.includes(tag.name)).length;
          return (
            <Link
              key={tag.id}
              href={`/tag/${tag.name}`}
              className="card p-4 hover:shadow-cardHover transition-shadow"
            >
              <div className="text-base font-bold text-brand">#{tag.name}</div>
              <div className="text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>
                {count} 篇文章
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
