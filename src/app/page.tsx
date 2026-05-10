import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { siteInfo } from "@/lib/siteInfo";
import { categories } from "@/lib/categories";
import { getFeaturedProducts } from "@/lib/products";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata(
  "Twin Falls Hardware & Supply",
  "Twin Falls Hardware & Supply — open since 1987. Same-day special orders, price match guarantee, free local delivery on $75+. Serving Twin Falls and the Magic Valley.",
  "/"
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you offer same-day special orders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. In many cases we can get special-order items same day for customers in Twin Falls, Jerome, and Kimberly. Call us at (208) 555-0211.",
      },
    },
    {
      "@type": "Question",
      name: "Do you price match?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — bring a local competitor's price and we will match it. No exceptions for online-only retailers.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer contractor accounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qualified contractors can apply for a Net-30 account with volume discounts of 5%, 8%, or 12% depending on monthly spend.",
      },
    },
  ],
};

const trustBadges = [
  { icon: "🏪", label: "37 Years in Business" },
  { icon: "💲", label: "Price Match Guarantee" },
  { icon: "📦", label: "Same-Day Special Orders" },
  { icon: "🪖", label: "Contractors Welcome" },
  { icon: "🚚", label: "Free Delivery $75+" },
];

const comparisons = [
  {
    gary: "We Answer the Phone",
    bigBox: "Wait on Hold",
    icon: "📞",
  },
  {
    gary: "Same-Day Special Orders",
    bigBox: "2–5 Day Shipping",
    icon: "⚡",
  },
  {
    gary: "Staff Who Know the Trade",
    bigBox: "Self-Checkout Maze",
    icon: "🔨",
  },
];

const testimonials = [
  {
    name: "Dave Kowalski",
    location: "Blue Lakes Blvd, Twin Falls",
    body: "I needed a specific gate latch for my fence off Shoshone Street and couldn't find it anywhere online. Called Gary's and they had it on the shelf — I was in and out in eight minutes. That's why I've been coming here for fifteen years.",
  },
  {
    name: "Maria Trevino",
    location: "Jerome, ID",
    body: "We remodeled our kitchen and Gary's matched Home Depot's price on every single thing — paint, plumbing fittings, the works. The staff actually walked me through which copper fittings I needed instead of pointing me at an aisle. Worth the drive from Jerome every time.",
  },
  {
    name: "Scott Halvorsen",
    location: "Kimberly, ID",
    body: "I'm a contractor and I have accounts at all the big yards, but Gary's is where I go when I need something specific and fast. They special-ordered a whole pallet of pressure-treated 4x4s for a deck job on Fillmore Street and had them in the next morning. Unmatched.",
  },
];

const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteInfo.address)}`;

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <JsonLd schema={faqSchema} />
      {/* ── 1. Hero ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black leading-tight text-(--color-brand) mb-6">
              Twin Falls' Hardware Store — Open Since 1987
            </h1>
            <p className="text-lg sm:text-xl text-(--color-gray-dark) leading-relaxed mb-10 max-w-lg">
              Tired of waiting 45 minutes at the big-box store just to find out
              they don't have your part? We pick up the phone. We pull the part.
              You're out in 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-(--color-brand) text-white font-semibold text-base hover:bg-(--color-brand-dark) transition-colors"
              >
                Shop All Products
              </Link>
              <a
                href={`tel:${siteInfo.phoneTel}`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-(--color-brand) text-(--color-brand) font-semibold text-base hover:bg-red-50 transition-colors"
              >
                📞 Call Us Now
              </a>
            </div>
          </div>
          <div className="hidden lg:block rounded-2xl overflow-hidden shadow-xl aspect-[4/3] relative">
            <Image
              src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=1200&auto=format&fit=crop&q=80"
              alt="Hardware tools ready to use"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── 2. Trust Strip ────────────────────────────────────── */}
      <section className="bg-(--color-brand)">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex gap-3 overflow-x-auto pb-1 sm:justify-center">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 whitespace-nowrap bg-white/10 text-white rounded-full px-5 py-2.5 text-sm font-semibold flex-shrink-0"
              >
                <span className="text-base" aria-hidden="true">
                  {badge.icon}
                </span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Category Grid ──────────────────────────────────── */}
      <section className="bg-(--color-warm-white) py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-(--color-gray-dark) mb-10 text-center">
            Shop by Department
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span
                    className="absolute top-3 left-3 text-2xl"
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-bold text-base text-(--color-gray-dark) mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-snug line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Featured Products ──────────────────────────────── */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-(--color-gray-dark)">
              Featured Products
            </h2>
            <Link
              href="/products"
              className="text-sm font-semibold text-(--color-brand) hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.category}/${product.id}`}
                className="group bg-(--color-warm-white) rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-(--color-gray-dark) leading-snug mb-2 line-clamp-2 group-hover:text-(--color-brand) transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-base font-bold text-(--color-brand)">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Gary vs. Big-Box ───────────────────────────────── */}
      <section className="bg-(--color-warm-white) py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-(--color-gray-dark) mb-4 text-center">
            Why Gary's vs. The Big-Box Stores
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            We've been doing this since 1987. Here's what that experience means
            for you.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {comparisons.map((item) => (
              <div
                key={item.gary}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="bg-(--color-brand) px-6 py-5 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs text-red-200 font-semibold uppercase tracking-wide mb-0.5">
                      Gary's
                    </p>
                    <p className="text-white font-heading font-bold text-lg leading-tight">
                      {item.gary}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-5 flex items-center gap-3">
                  <span className="text-2xl opacity-30" aria-hidden="true">
                    ✗
                  </span>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                      Big-Box
                    </p>
                    <p className="text-(--color-gray-dark) font-semibold text-base leading-tight line-through decoration-red-300">
                      {item.bigBox}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Testimonials ───────────────────────────────────── */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-(--color-gray-dark) mb-12 text-center">
            What Twin Falls Customers Say
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="bg-(--color-warm-white) rounded-xl p-6 border border-gray-100"
              >
                <div className="flex text-(--color-brand) text-lg mb-4" aria-label="5 stars">
                  {"★★★★★"}
                </div>
                <blockquote className="text-(--color-gray-dark) text-sm leading-relaxed mb-5">
                  &ldquo;{t.body}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="font-semibold text-sm text-(--color-gray-dark)">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Store Info ─────────────────────────────────────── */}
      <section className="bg-(--color-gray-dark) text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-black mb-12 text-center">
            Visit Us in Twin Falls
          </h2>
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            {/* Address */}
            <div>
              <div className="text-3xl mb-4" aria-hidden="true">📍</div>
              <h3 className="font-heading font-bold text-lg mb-2">Address</h3>
              <address className="not-italic text-gray-300 text-sm leading-relaxed">
                {siteInfo.address}
              </address>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm font-semibold text-(--color-brand) hover:underline"
              >
                Get Directions →
              </a>
            </div>

            {/* Phone */}
            <div>
              <div className="text-3xl mb-4" aria-hidden="true">📞</div>
              <h3 className="font-heading font-bold text-lg mb-2">Phone</h3>
              <a
                href={`tel:${siteInfo.phoneTel}`}
                className="text-gray-300 text-sm hover:text-white transition-colors"
              >
                {siteInfo.phone}
              </a>
              <p className="text-xs text-gray-500 mt-2">
                We actually pick up.
              </p>
            </div>

            {/* Hours */}
            <div>
              <div className="text-3xl mb-4" aria-hidden="true">🕗</div>
              <h3 className="font-heading font-bold text-lg mb-2">Hours</h3>
              <dl className="space-y-1">
                {siteInfo.hours.map((h) => (
                  <div key={h.days} className="flex justify-center gap-3 text-sm">
                    <dt className="text-gray-400 w-16 text-right">{h.days}</dt>
                    <dd className="text-gray-200">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
