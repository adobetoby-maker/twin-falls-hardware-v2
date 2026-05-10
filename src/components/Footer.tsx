import Link from "next/link";
import { siteInfo } from "@/lib/siteInfo";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contractors", label: "Contractors" },
  { href: "/special-orders", label: "Special Orders" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-(--color-gray-dark) text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p className="font-heading font-black text-white text-xl uppercase tracking-tight">
            Twin Falls Hardware & Supply
          </p>
          <p className="mt-2 text-sm italic text-gray-400">{siteInfo.tagline}</p>
          <p className="mt-4 text-sm">
            <a
              href={`tel:${siteInfo.phoneTel}`}
              className="hover:text-white transition-colors"
            >
              {siteInfo.phone}
            </a>
          </p>
          <p className="text-sm">
            <a
              href={`mailto:${siteInfo.email}`}
              className="hover:text-white transition-colors"
            >
              {siteInfo.email}
            </a>
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-4">
            Navigate
          </p>
          <ul className="space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours + Address */}
        <div>
          <p className="font-heading font-bold text-white text-sm uppercase tracking-widest mb-4">
            Store Hours
          </p>
          <ul className="space-y-1 text-sm">
            {siteInfo.hours.map((h) => (
              <li key={h.days}>
                <span className="text-white font-semibold">{h.days}</span>{" "}
                {h.hours}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">{siteInfo.address}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-gray-600 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
        <p>
          © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
        </p>
        <p>Est. {siteInfo.founded} · Owner: {siteInfo.owner}</p>
      </div>
    </footer>
  );
}
