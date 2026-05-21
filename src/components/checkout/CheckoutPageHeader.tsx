import Link from "next/link";

export function CheckoutPageHeader() {
  return (
    <section className="relative bg-checkout-bg py-14 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c5c5c5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-checkout-green font-semibold mb-3">
          Checkout
        </h1>
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-checkout-green transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/cart"
            className="hover:text-checkout-green transition-colors"
          >
            Shopping Cart
          </Link>
          <span className="mx-2">/</span>
          <span className="text-checkout-green">Checkout</span>
        </nav>
      </div>
    </section>
  );
}
