import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { articles } from "@/lib/articles";

export const metadata: Metadata = buildMetadata(
  "Hardware Tips & Local Guides",
  "Hardware tips, DIY guides, and local project advice for Twin Falls and Magic Valley homeowners and contractors. From plumbing fixes to deck-building guides.",
  "/blog"
);

export default function BlogPage() {
  return (
    <div className="bg-(--color-warm-white) min-h-screen">
      <section className="bg-(--color-gray-dark) text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-black text-4xl sm:text-5xl uppercase mb-3">
            Hardware Tips & Local Guides
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Project guides, seasonal tips, and local advice for Twin Falls and
            Magic Valley homeowners and contractors.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ul className="space-y-8">
          {articles.map((article) => (
            <li
              key={article.slug}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link href={`/blog/${article.slug}`} className="block p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-(--color-brand) uppercase tracking-wide bg-red-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                  <span className="text-xs text-gray-400">{article.readTime} read</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-(--color-gray-dark) mb-3 leading-tight group-hover:text-(--color-brand)">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <span className="text-sm font-semibold text-(--color-brand) hover:underline">
                  Read article →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
