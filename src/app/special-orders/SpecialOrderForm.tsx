"use client";

import { useState } from "react";
import { siteInfo } from "@/lib/siteInfo";

export default function SpecialOrderForm() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    itemDescription: "",
    quantity: "",
    urgency: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/special-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        itemDescription: fields.itemDescription,
        quantity: fields.quantity,
        neededBy: fields.urgency,
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(data.error ?? "Something went wrong. Please call us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4" aria-hidden="true">✅</div>
        <h3 className="font-heading font-bold text-2xl text-green-800 mb-2">
          Special order request received!
        </h3>
        <p className="text-green-700">
          We'll get on it right away and contact you to confirm availability and pickup time. In a
          hurry? Call us at{" "}
          <a href={siteInfo.phoneTel} className="font-semibold underline">
            {siteInfo.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="so-name"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Name <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="so-name"
            name="name"
            type="text"
            required
            value={fields.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="so-email"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Email <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="so-email"
            name="email"
            type="email"
            required
            value={fields.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="so-phone"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Phone <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="so-phone"
            name="phone"
            type="tel"
            required
            value={fields.phone}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="(208) 555-0000"
          />
        </div>

        <div>
          <label
            htmlFor="so-urgency"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Urgency
          </label>
          <select
            id="so-urgency"
            name="urgency"
            value={fields.urgency}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors bg-white"
          >
            <option value="">Select urgency</option>
            <option value="Same Day">Same Day</option>
            <option value="Next Day">Next Day</option>
            <option value="This Week">This Week</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="so-item"
          className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
        >
          Item Description <span className="text-(--color-brand)">*</span>
        </label>
        <textarea
          id="so-item"
          name="itemDescription"
          rows={4}
          required
          value={fields.itemDescription}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors resize-none"
          placeholder="Describe the item, including brand, model number, size, or any spec details you have."
        />
      </div>

      <div>
        <label
          htmlFor="so-quantity"
          className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
        >
          Quantity
        </label>
        <input
          id="so-quantity"
          name="quantity"
          type="text"
          value={fields.quantity}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
          placeholder="e.g. 10 boards, 2 units, 1 pallet"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-(--color-brand) text-white font-semibold py-3 rounded-lg hover:bg-(--color-brand-dark) transition-colors disabled:opacity-60 text-base"
      >
        {status === "loading" ? "Submitting…" : "Submit Special Order Request"}
      </button>
    </form>
  );
}
