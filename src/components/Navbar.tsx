"use client";

import Link from "next/link";
import { useState } from "react";
import CartCount from "./CartCount";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/contractors", label: "Contractors" },
  { href: "/special-orders", label: "Special Orders" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-none font-heading font-black text-(--color-brand) hover:text-(--color-brand-dark)"
          >
            <span className="text-xl tracking-tight uppercase">
              Twin Falls Hardware
            </span>
            <span className="text-xs font-semibold text-(--color-gray-dark) tracking-widest uppercase font-body">
              & Supply · Est. 1987
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-(--color-gray-dark) hover:text-(--color-brand) transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <CartCount />
          </nav>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <CartCount />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="p-2 rounded text-(--color-gray-dark) hover:text-(--color-brand)"
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="md:hidden border-t border-gray-200 bg-white px-4 pb-4"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-semibold text-(--color-gray-dark) hover:text-(--color-brand) border-b border-gray-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
