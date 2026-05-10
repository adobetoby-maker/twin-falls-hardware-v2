"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
      },
      1
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <Link
        href={`/products/${product.category}/${product.id}`}
        className="block aspect-[4/3] overflow-hidden bg-gray-100"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link
          href={`/products/${product.category}/${product.id}`}
          className="font-heading font-bold text-(--color-gray-dark) hover:text-(--color-brand) text-base leading-tight mb-1"
        >
          {product.name}
        </Link>
        <p className="text-xs text-gray-500 flex-1 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-lg font-black font-heading text-(--color-brand)">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-(--color-brand) hover:bg-(--color-brand-dark) text-white text-sm font-semibold px-3 py-1.5 rounded transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
