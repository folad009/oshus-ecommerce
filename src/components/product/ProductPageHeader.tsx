import Link from "next/link";

export function ProductPageHeader() {
  return (
    <section className="relative bg-cart-green-bg py-14 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #a8c5a8 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-forest font-semibold mb-3">
          Shop
        </h1>
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-forest transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-forest transition-colors">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-forest">Product Details</span>
        </nav>
      </div>
    </section>
  );
}
