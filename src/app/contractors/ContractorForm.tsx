"use client";

import { useState } from "react";
import { siteInfo } from "@/lib/siteInfo";

export default function ContractorForm() {
  const [fields, setFields] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    monthlyVolume: "",
    message: "",
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

    const res = await fetch("/api/contractor-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: fields.companyName,
        contactName: fields.contactName,
        email: fields.email,
        phone: fields.phone,
        trade: fields.licenseNumber,
        monthlySpend: fields.monthlyVolume,
        notes: fields.message,
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
          Application received!
        </h3>
        <p className="text-green-700">
          Gary or a team member will review your application and contact you within one business
          day. Questions? Call{" "}
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
            htmlFor="ca-company"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Company Name <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="ca-company"
            name="companyName"
            type="text"
            required
            value={fields.companyName}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="Hendricks Contracting LLC"
          />
        </div>

        <div>
          <label
            htmlFor="ca-contact"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Contact Name <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="ca-contact"
            name="contactName"
            type="text"
            required
            value={fields.contactName}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="Your name"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="ca-email"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Email <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="ca-email"
            name="email"
            type="email"
            required
            value={fields.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label
            htmlFor="ca-phone"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Phone <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="ca-phone"
            name="phone"
            type="tel"
            required
            value={fields.phone}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="(208) 555-0000"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="ca-license"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Contractor License Number <span className="text-(--color-brand)">*</span>
          </label>
          <input
            id="ca-license"
            name="licenseNumber"
            type="text"
            required
            value={fields.licenseNumber}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors"
            placeholder="ID-RCE-12345"
          />
        </div>

        <div>
          <label
            htmlFor="ca-volume"
            className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
          >
            Estimated Monthly Volume
          </label>
          <select
            id="ca-volume"
            name="monthlyVolume"
            value={fields.monthlyVolume}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors bg-white"
          >
            <option value="">Select a range</option>
            <option value="Under $500/mo">Under $500/mo</option>
            <option value="$500–$1,500/mo">$500–$1,500/mo (5% discount)</option>
            <option value="$1,500–$5,000/mo">$1,500–$5,000/mo (8% discount)</option>
            <option value="$5,000+/mo">$5,000+/mo (12% discount)</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="ca-message"
          className="block text-sm font-semibold text-(--color-gray-dark) mb-1"
        >
          Additional Information
        </label>
        <textarea
          id="ca-message"
          name="message"
          rows={4}
          value={fields.message}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-(--color-gray-dark) focus:outline-none focus:border-(--color-brand) transition-colors resize-none"
          placeholder="Tell us about your trade, typical project types, or anything else we should know."
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
        {status === "loading" ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
