import CartContents from "./CartContents";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-(--color-warm-white)">
      <section className="bg-(--color-gray-dark) text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold mb-2">Your Quote Request</h1>
          <p className="text-gray-300">
            Review your items and submit a quote — we&apos;ll get back to you same day.
          </p>
        </div>
      </section>
      <CartContents />
    </main>
  );
}
