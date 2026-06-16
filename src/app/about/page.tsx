import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteInfo } from "@/lib/siteInfo";

export const metadata: Metadata = buildMetadata(
  "About Twin Falls Hardware & Supply",
  "Meet Gary Hendricks and the team at Twin Falls Hardware & Supply. Family-owned since 1987, serving Twin Falls and the Magic Valley for 37+ years.",
  "/about"
);

const timeline = [
  {
    year: "1987",
    event: "Bob Hendricks opens Twin Falls Hardware & Supply on Addison Ave W.",
  },
  {
    year: "1995",
    event: "Expanded the store to double the retail floor space and added a dedicated contractor counter.",
  },
  {
    year: "2001",
    event: "Gary Hendricks takes over from his father, continuing the family legacy.",
  },
  {
    year: "2010",
    event: "Launched same-day special orders for contractors across the Magic Valley.",
  },
  {
    year: "2018",
    event: "Introduced the Net-30 contractor account program with volume discounts.",
  },
  {
    year: "2024",
    event: "37 years strong — still the same two-person service counter, still answering the phone.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-(--color-warm-white)">
      {/* Hero */}
      <section className="bg-(--color-gray-dark) text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading font-black text-4xl sm:text-5xl uppercase mb-4">
            About Twin Falls Hardware
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Family-owned since 1987. Four staff. One goal: get you in and out in
            10 minutes with exactly what you need.
          </p>
        </div>
      </section>

      {/* Gary's Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop&q=80"
              alt="Hardware store interior"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-(--color-brand) font-heading font-bold uppercase tracking-widest text-sm mb-3">
              Our Story
            </p>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-(--color-gray-dark) mb-6 uppercase">
              37 Years, Same Philosophy
            </h2>
            <div className="space-y-4 text-(--color-gray-dark) leading-relaxed">
              <p>
                Bob Hendricks opened Twin Falls Hardware & Supply in 1987 with a
                simple belief: a hardware store should know its customers by
                name and have the part they need before they ask.
              </p>
              <p>
                Gary took over from his father in 2001, keeping that philosophy
                intact. Today, with a team of four, Twin Falls Hardware & Supply
                serves contractors, homeowners, and weekend builders across the
                Magic Valley — Twin Falls, Jerome, Kimberly, Buhl, and beyond.
              </p>
              <p>
                We don&rsquo;t have a self-checkout maze or a call center. We
                have a phone that we pick up, a counter staffed by people who
                know the difference between a compression fitting and a push-fit,
                and a same-day special order capability that the big-box stores
                can&rsquo;t match.
              </p>
            </div>
            <a
              href={`tel:${siteInfo.phoneTel}`}
              className="mt-6 inline-flex items-center gap-2 bg-(--color-brand) hover:bg-(--color-brand-dark) text-white font-heading font-bold px-6 py-3 rounded transition-colors"
            >
              Call Gary: {siteInfo.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-(--color-gray-dark) mb-12 text-center">
            Our History
          </h2>
          <ol className="relative border-l-2 border-(--color-brand) space-y-8 pl-8">
            {timeline.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[2.6rem] top-0 bg-(--color-brand) text-white text-xs font-bold px-2 py-1 rounded">
                  {item.year}
                </span>
                <p className="text-(--color-gray-dark) leading-relaxed">
                  {item.event}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Community */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase text-(--color-gray-dark) mb-8 text-center">
          Community Involvement
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-2xl mb-3" aria-hidden="true">⚾</p>
            <h3 className="font-heading font-bold text-lg text-(--color-gray-dark) mb-2">
              Twin Falls Little League
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Proud sponsor of Twin Falls Little League since 2003. Kids in our
              community deserve to play, and we&rsquo;re glad to help make that
              happen.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-2xl mb-3" aria-hidden="true">🤝</p>
            <h3 className="font-heading font-bold text-lg text-(--color-gray-dark) mb-2">
              Twin Falls Rotary Club
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Gary has been a Rotary Club member since 2005, contributing to
              community service projects across the Magic Valley.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-(--color-brand) text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-black text-3xl uppercase mb-4">
            Come See Us
          </h2>
          <p className="text-red-100 mb-6">
            {siteInfo.address} · {siteInfo.hours.map((h) => `${h.days} ${h.hours}`).join(" | ")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://maps.google.com/?q=2180+Addison+Ave+W+Twin+Falls+ID+83301"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-(--color-brand) font-heading font-bold px-6 py-3 rounded hover:bg-gray-100 transition-colors"
            >
              Get Directions
            </a>
            <Link
              href="/products"
              className="border-2 border-white text-white font-heading font-bold px-6 py-3 rounded hover:bg-white/10 transition-colors"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
