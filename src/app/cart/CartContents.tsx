"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { siteInfo } from "@/lib/siteInfo";

export default function CartContents() {
  const { items, removeItem, updateQty, clearCart, total, count } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const res = await fetch("/api/quote-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        notes,
        items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
        total,
      }),
    });

    if (res.ok) {
      setStatus("sent");
      clearCart();
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? "Failed to send. Please call us directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-5xl mb-4" aria-hidden="true">✅</div>
        <h2 className="font-heading font-black text-3xl text-(--color-gray-dark) mb-4">
          Quote Request Sent!
        </h2>
        <p className="text-gray-600 mb-8">
          We&rsquo;ll confirm availability and get back to you shortly. Questions?{" "}
          <a href={siteInfo.phoneTel} className="text-(--color-brand) font-semibold hover:underline">
            Call {siteInfo.phone}
          </a>
          .
        </p>
        <Link
          href="/products"
          className="bg-(--color-brand) text-white font-heading font-bold px-6 py-3 rounded hover:bg-(--color-brand-dark) transition-colors"
        >
          Keep Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-5xl mb-4" aria-hidden="true">🛒</div>
        <h2 className="font-heading font-black text-2xl text-(--color-gray-dark) mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Browse our products and add items to get a quote.
        </p>
        <Link
          href="/products"
          className="bg-(--color-brand) text-white font-heading font-bold px-6 py-3 rounded hover:bg-(--color-brand-dark) transition-colors"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4 items-start"
            >
              <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.category}/${item.id}`}
                  className="font-semibold text-(--color-gray-dark) hover:text-(--color-brand) text-sm leading-snug"
                >
                  {item.name}
                </Link>
                <p className="text-(--color-brand) font-bold mt-1">
                  ${item.price.toFixed(2)} ea.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 flex items-center justify-center font-bold text-(--color-gray-dark) hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 flex items-center justify-center font-bold text-(--color-gray-dark) hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="text-gray-400 hover:text-red-500 transition-colors text-xs font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right">
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-gray-400 hover:text-(--color-brand) transition-colors"
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* Quote request form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
          <h2 className="font-heading font-black text-xl text-(--color-gray-dark) mb-1 uppercase">
            Request a Quote
          </h2>
          <p className="text-xs text-gray-500 mb-5">
            {count} item{count !== 1 ? "s" : ""} · Total est.{" "}
            <strong>${total.toFixed(2)}</strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="quote-name"
                className="block text-xs font-semibold text-(--color-gray-dark) mb-1"
              >
                Name *
              </label>
              <input
                id="quote-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-(--color-brand) focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="quote-email"
                className="block text-xs font-semibold text-(--color-gray-dark) mb-1"
              >
                Email *
              </label>
              <input
                id="quote-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-(--color-brand) focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="quote-phone"
                className="block text-xs font-semibold text-(--color-gray-dark) mb-1"
              >
                Phone
              </label>
              <input
                id="quote-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-(--color-brand) focus:outline-none"
                placeholder="(208) 555-0000"
              />
            </div>
            <div>
              <label
                htmlFor="quote-notes"
                className="block text-xs font-semibold text-(--color-gray-dark) mb-1"
              >
                Notes
              </label>
              <textarea
                id="quote-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-(--color-brand) focus:outline-none resize-none"
                placeholder="Pickup preference, job site delivery, etc."
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-xs">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-(--color-brand) hover:bg-(--color-brand-dark) disabled:opacity-60 text-white font-heading font-bold py-3 rounded transition-colors"
            >
              {status === "sending" ? "Sending..." : "Send Quote Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
