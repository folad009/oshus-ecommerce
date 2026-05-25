import Link from "next/link";

interface AuthPageHeaderProps {
  title: string;
  breadcrumb: string;
}

export function AuthPageHeader({ title, breadcrumb }: AuthPageHeaderProps) {
  return (
    <section className="relative bg-shop-bg py-14 md:py-16 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d4d4d4 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-foreground font-semibold mb-3">
          {title}
        </h1>
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand">{breadcrumb}</span>
        </nav>
      </div>
    </section>
  );
}
