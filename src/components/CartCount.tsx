"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartCount() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-1 text-(--color-gray-dark) hover:text-(--color-brand) transition-colors font-semibold"
      aria-label={`Cart, ${count} item${count !== 1 ? "s" : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-(--color-brand) text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
