import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, getArticleBySlug } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";
import { siteInfo } from "@/lib/siteInfo";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const desc =
    article.excerpt.length <= 160
      ? article.excerpt
      : article.excerpt.slice(0, 157) + "...";

  return buildMetadata(article.title, desc, `/blog/${slug}`);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: siteInfo.owner,
    },
    publisher: {
      "@type": "Organization",
      name: siteInfo.name,
      url: siteInfo.url,
    },
  };

  const paragraphs = article.body
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <>
      <JsonLd schema={articleSchema} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-(--color-brand)">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-(--color-brand)">Blog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li
              className="font-semibold text-(--color-gray-dark) truncate max-w-[200px]"
              aria-current="page"
            >
              {article.title}
            </li>
          </ol>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-(--color-brand) uppercase tracking-wide bg-red-50 px-2 py-1 rounded">
              {article.category}
            </span>
            <span className="text-xs text-gray-400">{article.date}</span>
            <span className="text-xs text-gray-400">{article.readTime} read</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-(--color-gray-dark) leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-(--color-gray-dark)">
          {paragraphs.map((para, i) => {
            if (para.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="font-heading font-black text-2xl text-(--color-gray-dark) mt-10 mb-4 uppercase"
                >
                  {para.replace(/^## /, "")}
                </h2>
              );
            }
            if (para.startsWith("**") && para.endsWith("**")) {
              return (
                <p key={i} className="font-bold text-(--color-brand) mt-6 mb-2">
                  {para.replace(/\*\*/g, "")}
                </p>
              );
            }
            return (
              <p key={i} className="text-(--color-gray-dark) leading-relaxed mb-4">
                {para}
              </p>
            );
          })}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 mb-4">
            Have questions? Call us at{" "}
            <a
              href={`tel:${siteInfo.phoneTel}`}
              className="text-(--color-brand) font-semibold hover:underline"
            >
              {siteInfo.phone}
            </a>{" "}
            or stop by {siteInfo.address}.
          </p>
          <Link
            href="/blog"
            className="text-(--color-brand) font-semibold hover:underline text-sm"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
}
