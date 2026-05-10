import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};

  const desc = `Shop ${cat.name} at Twin Falls Hardware & Supply. ${cat.description} In stock for same-day pickup in Twin Falls, Idaho and the Magic Valley area.`;
  const clamped = desc.length > 160 ? desc.slice(0, 157) + "..." : desc;

  return buildMetadata(cat.name, clamped, `/products/${slug}`);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <main className="min-h-screen bg-(--color-warm-white)">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-white border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-(--color-brand) transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">
              /
            </li>
            <li>
              <Link href="/products" className="hover:text-(--color-brand) transition-colors">
                Products
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">
              /
            </li>
            <li className="font-semibold text-(--color-gray-dark)" aria-current="page">
              {category.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Category header */}
      <section className="relative bg-(--color-gray-dark) text-white py-14 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-3xl mb-2" aria-hidden="true">
            {category.icon}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">
            {category.name} in Twin Falls
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">{category.description}</p>
        </div>
      </section>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-gray-500 mb-6">
          {categoryProducts.length}{" "}
          {categoryProducts.length === 1 ? "product" : "products"} available
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryProducts.map((product) => (
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
                <h2 className="font-heading font-semibold text-(--color-gray-dark) text-sm sm:text-base leading-snug mb-2 group-hover:text-(--color-brand) transition-colors line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-(--color-brand) font-bold text-base sm:text-lg">
                  ${product.price.toFixed(2)}
                </p>
                {product.inStock ? (
                  <p className="text-green-600 text-xs mt-1 font-medium">In Stock</p>
                ) : (
                  <p className="text-gray-400 text-xs mt-1 font-medium">Out of Stock</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {categoryProducts.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No products in this category yet.</p>
            <Link
              href="/products"
              className="mt-4 inline-block text-(--color-brand) font-semibold hover:underline"
            >
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
