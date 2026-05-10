import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteInfo } from "@/lib/siteInfo";
import ContactForm from "./ContactForm";

export const metadata: Metadata = buildMetadata(
  "Contact Us",
  "Contact Twin Falls Hardware & Supply at (208) 555-0211 or visit us at 2180 Addison Ave W, Twin Falls, ID. Mon–Sat 7AM–6PM, Sun 9AM–4PM. We actually pick up.",
  "/contact"
);

const mapsUrl =
  "https://maps.google.com/?q=2180+Addison+Ave+W+Twin+Falls+ID+83301";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-(--color-warm-white)">
      {/* Header */}
      <section className="bg-(--color-gray-dark) text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">
            Contact Twin Falls Hardware & Supply
          </h1>
          <p className="text-gray-300 text-lg">
            We pick up the phone. Stop in. Send a message. Whatever works for you.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Store info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading font-bold text-2xl text-(--color-gray-dark) mb-5">
                Store Information
              </h2>

              {/* Address */}
              <div className="flex gap-4 mb-6">
                <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
                  📍
                </span>
                <div>
                  <p className="font-semibold text-(--color-gray-dark) mb-1">Address</p>
                  <address className="not-italic text-gray-600 text-sm leading-relaxed">
                    {siteInfo.address}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm font-semibold text-(--color-brand) hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 mb-6">
                <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
                  📞
                </span>
                <div>
                  <p className="font-semibold text-(--color-gray-dark) mb-1">Phone</p>
                  <a
                    href={`tel:${siteInfo.phoneTel}`}
                    className="text-gray-600 text-sm hover:text-(--color-brand) transition-colors"
                  >
                    {siteInfo.phone}
                  </a>
                  <p className="text-xs text-gray-400 mt-1">We actually pick up — try us.</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
                  🕗
                </span>
                <div>
                  <p className="font-semibold text-(--color-gray-dark) mb-2">Hours</p>
                  <dl className="space-y-1">
                    {siteInfo.hours.map((h) => (
                      <div key={h.days} className="flex gap-4 text-sm">
                        <dt className="text-gray-400 w-20">{h.days}</dt>
                        <dd className="text-(--color-gray-dark) font-medium">{h.hours}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Map embed placeholder — static link */}
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <div className="aspect-[4/3] flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                  <span className="text-5xl mb-3" aria-hidden="true">🗺️</span>
                  <span className="text-sm font-semibold text-(--color-brand)">
                    Open in Google Maps →
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    {siteInfo.address}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-heading font-bold text-xl text-(--color-gray-dark) mb-2">
              Send Us a Message
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              We respond within one business day. For faster help, give us a call.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
