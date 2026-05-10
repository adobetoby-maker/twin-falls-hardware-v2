import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";
import { products } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Shop All Products",
  "Shop power tools, lumber, plumbing, electrical, paint, fasteners, safety gear, and hand tools at Twin Falls Hardware & Supply. Serving Magic Valley since 1987.",
  "/products"
);

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const activeCategory = categories.find((c) => c.slug === category) ?? null;
  const displayed = activeCategory
    ? products.filter((p) => p.category === activeCategory.slug)
    : products;

  return (
    <main className="min-h-screen bg-(--color-warm-white)">
      {/* Header */}
      <section className="bg-(--color-gray-dark) text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold mb-2">
            Shop Twin Falls Hardware Products
          </h1>
          <p className="text-gray-300 text-lg">
            {activeCategory
              ? `${activeCategory.description}`
              : "All departments — power tools, lumber, plumbing, electrical, paint, fasteners, safety gear, and hand tools."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
              !activeCategory
                ? "bg-(--color-brand) text-white border-transparent"
                : "border-gray-300 text-(--color-gray-dark) hover:border-(--color-brand) hover:text-(--color-brand)"
            }`}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                activeCategory?.slug === cat.slug
                  ? "bg-(--color-brand) text-white border-transparent"
                  : "border-gray-300 text-(--color-gray-dark) hover:border-(--color-brand) hover:text-(--color-brand)"
              }`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {displayed.length} {displayed.length === 1 ? "product" : "products"}
          {activeCategory ? ` in ${activeCategory.name}` : ""}
        </p>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayed.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.category}/${product.id}`}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 18vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!product.inStock && (
                  <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    Out of Stock
                  </span>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {categories.find((c) => c.slug === product.category)?.name ?? product.category}
                </p>
                <h2 className="font-heading font-semibold text-(--color-gray-dark) text-sm sm:text-base leading-snug mb-2 group-hover:text-(--color-brand) transition-colors line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-(--color-brand) font-bold text-base sm:text-lg">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
