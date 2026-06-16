import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteInfo } from "@/lib/siteInfo";
import SpecialOrderForm from "./SpecialOrderForm";

export const metadata: Metadata = buildMetadata(
  "Same-Day Special Orders",
  "Same-day special orders for Twin Falls and Magic Valley contractors. If we don't have it, we'll source it fast. Submit a request online or call (208) 733-1600.",
  "/special-orders"
);

const steps = [
  {
    number: "01",
    title: "Call or Submit the Form",
    body: "Tell us what you need — part number, brand, specs, or a description. The more detail, the faster we can source it.",
  },
  {
    number: "02",
    title: "We Source It",
    body: "Gary's team reaches out to our supplier network. For most items, we can confirm availability and pricing within the hour.",
  },
  {
    number: "03",
    title: "Pick Up Same Day or Next Day",
    body: "We'll contact you as soon as it arrives. Same-day pickup is available for most items ordered before noon. Next-day for everything else.",
  },
];

export default function SpecialOrdersPage() {
  return (
    <main className="min-h-screen bg-(--color-warm-white)">
      {/* Hero */}
      <section className="bg-(--color-gray-dark) text-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Same-Day Special Orders — Twin Falls, Idaho
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            If we don&apos;t have it, we&apos;ll get it — often same day for Twin Falls and Magic
            Valley contractors. Submit a request below or call us at{" "}
            <a
              href={`tel:${siteInfo.phoneTel}`}
              className="text-white font-semibold underline underline-offset-2 hover:text-gray-200 transition-colors"
            >
              {siteInfo.phone}
            </a>
            .
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-heading font-bold text-3xl text-(--color-gray-dark) mb-10 text-center">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-(--color-brand) text-white font-heading font-black text-xl mb-5">
                  {step.number}
                </div>
                <h3 className="font-heading font-bold text-lg text-(--color-gray-dark) mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Callout bar */}
      <section className="bg-(--color-brand) py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-heading font-bold text-xl text-center sm:text-left">
            In a hurry? Call us directly — we answer fast.
          </p>
          <a
            href={`tel:${siteInfo.phoneTel}`}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-(--color-brand) font-bold px-6 py-3 rounded-lg hover:bg-red-50 transition-colors"
          >
            📞 {siteInfo.phone}
          </a>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <h2 className="font-heading font-bold text-2xl text-(--color-gray-dark) mb-2">
              Submit a Special Order Request
            </h2>
            <p className="text-sm text-gray-500 mb-7">
              Fields marked with{" "}
              <span className="text-(--color-brand) font-semibold">*</span> are required. We&apos;ll
              contact you to confirm availability and pricing before pulling the order.
            </p>
            <SpecialOrderForm />
          </div>
        </div>
      </section>
    </main>
  );
}
