"use client";

import { useState } from "react";
import { siteInfo } from "@/lib/siteInfo";

export default function ContactForm() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
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
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
        <div className="text-4xl mb-4" aria-hidden="true">✅</div>
        <h3 className="font-heading font-bold text-2xl text-green-800 mb-2">Message sent!</h3>
        <p className="text-green-700 text-sm">
          We&apos;ll get back to you within one business day. For urgent matters, call us directly at{" "}
          <a href={siteInfo.phoneTel} className="font-semibold underline">
            {siteInfo.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="cf-name"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Name <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            value={fields.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="cf-email"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Email <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="cf-email"
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

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="cf-phone"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Phone
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="(208) 555-0000"
          />
        </div>

        <div>
          <label
            htmlFor="cf-subject"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Subject
          </label>
          <input
            id="cf-subject"
            name="subject"
            type="text"
            value={fields.subject}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="What's this about?"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="cf-message"
          className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
        >
          Message <span className="text-(--color-brand)">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors resize-none"
          placeholder="How can we help you?"
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
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
