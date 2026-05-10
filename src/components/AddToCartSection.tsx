"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/products";

export default function AddToCartSection({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  function handleAdd() {
    // Call addItem ONCE — never in a loop
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
      },
      qty
    );
  }

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Qty stepper */}
      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className="w-10 h-10 flex items-center justify-center text-lg font-bold text-(--color-gray-dark) hover:bg-gray-100 transition-colors"
        >
          −
        </button>
        <span
          className="w-10 text-center font-semibold text-(--color-gray-dark)"
          aria-live="polite"
          aria-label={`Quantity: ${qty}`}
        >
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
          className="w-10 h-10 flex items-center justify-center text-lg font-bold text-(--color-gray-dark) hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="bg-(--color-brand) hover:bg-(--color-brand-dark) text-white font-bold font-heading text-lg px-8 py-3 rounded transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}
