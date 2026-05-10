import { siteInfo } from "@/lib/siteInfo";

export default function PromoBar() {
  return (
    <div className="bg-(--color-brand) text-white text-sm font-semibold py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
        <span>FREE local delivery on orders $75+</span>
        <span aria-hidden="true" className="hidden sm:inline">|</span>
        <span>Same-Day Special Orders</span>
        <span aria-hidden="true" className="hidden sm:inline">|</span>
        <a
          href={`tel:${siteInfo.phoneTel}`}
          className="underline underline-offset-2 hover:no-underline"
        >
          {siteInfo.phone}
        </a>
      </div>
    </div>
  );
}
