import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteInfo } from "@/lib/siteInfo";
import ContractorForm from "./ContractorForm";

export const metadata: Metadata = buildMetadata(
  "Contractor Accounts",
  "Net-30 contractor accounts at Twin Falls Hardware & Supply. Volume discounts up to 12%, same-day special orders, and a dedicated contractor counter. Apply online today.",
  "/contractors"
);

const discountTiers = [
  { volume: "$500/mo", discount: "5%", label: "Starter" },
  { volume: "$1,500/mo", discount: "8%", label: "Pro" },
  { volume: "$5,000/mo", discount: "12%", label: "Commercial" },
];

const benefits = [
  {
    icon: "📦",
    title: "Same-Day Special Orders",
    body: "Need something that's not on our shelves? Call before noon and we'll track it down. Often available same day for Twin Falls and Magic Valley contractors.",
  },
  {
    icon: "🪖",
    title: "Dedicated Contractor Counter",
    body: "Skip the retail line. Our contractor counter is staffed by people who know the trade. We pull your order, you grab it and go.",
  },
  {
    icon: "🧾",
    title: "Flexible Net-30 Invoicing",
    body: "One clean invoice at the end of the month instead of a stack of receipts. Keeps your bookkeeping simple and your cash flow healthy.",
  },
  {
    icon: "📞",
    title: "We Pick Up the Phone",
    body: "Call us with a materials question at 7AM before your crew hits the job. We answer, we know the trade, and we'll have your answer in under a minute.",
  },
];

export default function ContractorsPage() {
  return (
    <main className="min-h-screen bg-(--color-warm-white)">
      {/* Header */}
      <section className="bg-(--color-gray-dark) text-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Contractor Accounts — Twin Falls Hardware & Supply
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Net-30 terms, volume discounts up to 12%, and staff who actually know your trade.
            Serving Twin Falls and Magic Valley contractors since 1987.
          </p>
        </div>
      </section>

      {/* Discount tiers */}
      <section className="bg-(--color-brand) py-10">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-white font-semibold text-center mb-6 text-sm uppercase tracking-widest">
            Volume Discount Tiers
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {discountTiers.map((tier) => (
              <div
                key={tier.label}
                className="bg-white/10 rounded-xl p-5 text-center text-white"
              >
                <p className="text-xs uppercase tracking-wide text-red-200 mb-1">{tier.label}</p>
                <p className="font-heading font-black text-4xl mb-1">{tier.discount}</p>
                <p className="text-sm text-red-100">at {tier.volume}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl text-(--color-gray-dark) mb-10 text-center">
            What You Get as a Contractor Account Holder
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex gap-4 bg-(--color-warm-white) rounded-xl p-6 border border-gray-100"
              >
                <span className="text-3xl flex-shrink-0" aria-hidden="true">
                  {b.icon}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-lg text-(--color-gray-dark) mb-1">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <h2 className="font-heading font-bold text-2xl text-(--color-gray-dark) mb-2">
              Apply for a Contractor Account
            </h2>
            <p className="text-sm text-gray-500 mb-7">
              We review applications within one business day. For faster approval, call us at{" "}
              <a
                href={`tel:${siteInfo.phoneTel}`}
                className="text-(--color-brand) font-semibold hover:underline"
              >
                {siteInfo.phone}
              </a>
              .
            </p>
            <ContractorForm />
          </div>
        </div>
      </section>
    </main>
  );
}
