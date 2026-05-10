import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { products, getProductById, getProductsByCategory } from "@/lib/products";
import { categories } from "@/lib/categories";
import { siteInfo } from "@/lib/siteInfo";
import { buildMetadata } from "@/lib/seo";
import AddToCartSection from "@/components/AddToCartSection";
import JsonLd from "@/components/JsonLd";

export async function generateStaticParams() {
  return products.map((p) => ({ category: p.category, id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};

  const raw = `${product.name} — ${product.description} Shop at Twin Falls Hardware & Supply, serving Twin Falls and the Magic Valley area.`;
  const desc = raw.length > 160 ? raw.slice(0, 157) + "..." : raw;
  const padded =
    desc.length < 120
      ? desc.padEnd(120, " ").trimEnd() +
        " Available at Twin Falls Hardware & Supply."
      : desc;
  const final = padded.length > 160 ? padded.slice(0, 157) + "..." : padded;

  return buildMetadata(product.name, final, `/products/${product.category}/${product.id}`);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category: categorySlug, id } = await params;
  const product = getProductById(id);

  if (!product || product.category !== categorySlug) notFound();

  const category = categories.find((c) => c.slug === product.category);
  const related = getProductsByCategory(product.category).filter(
    (p) => p.id !== product.id
  );

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: siteInfo.name },
    },
  };

  return (
    <>
      <JsonLd schema={productSchema} />
      <div className="min-h-screen bg-(--color-warm-white)">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-white border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
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
            <li>
              <Link
                href={`/products/${product.category}`}
                className="hover:text-(--color-brand) transition-colors"
              >
                {category?.name ?? product.category}
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">
              /
            </li>
            <li
              className="font-semibold text-(--color-gray-dark) truncate max-w-[180px] sm:max-w-none"
              aria-current="page"
            >
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Product detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {/* Category tag */}
            <Link
              href={`/products/${product.category}`}
              className="text-sm font-semibold text-(--color-brand) uppercase tracking-wide mb-3 hover:underline w-fit"
            >
              {category?.icon} {category?.name ?? product.category}
            </Link>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-(--color-gray-dark) mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-(--color-brand) mb-4">
              ${product.price.toFixed(2)}
            </p>

            {/* In-stock badge */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-sm font-semibold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  In Stock — Ready for Pickup
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 border border-gray-200 text-sm font-semibold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Add to cart */}
            {product.inStock && <AddToCartSection product={product} />}

            {/* Contact CTA */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Questions? Call us at{" "}
                <a
                  href={`tel:${siteInfo.phoneTel}`}
                  className="font-semibold text-(--color-brand) hover:underline"
                >
                  {siteInfo.phone}
                </a>{" "}
                — our staff knows their products.
              </p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-(--color-gray-dark) mb-6">
              More {category?.name ?? "Products"}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.category}/${rel.id}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square bg-gray-50">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 18vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-heading font-semibold text-(--color-gray-dark) text-sm sm:text-base leading-snug mb-1 group-hover:text-(--color-brand) transition-colors line-clamp-2">
                      {rel.name}
                    </h3>
                    <p className="text-(--color-brand) font-bold">
                      ${rel.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
    </>
  );
}
