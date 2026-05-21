import Link from "next/link";

interface AuthSplitPanelProps {
  heading: string;
  description: string;
  children: React.ReactNode;
}

export function AuthSplitPanel({
  heading,
  description,
  children,
}: AuthSplitPanelProps) {
  return (
    <section className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border shadow-sm min-h-[520px]">
          <div className="bg-forest text-white p-8 md:p-12 flex flex-col justify-center">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="size-10 bg-coral rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm">O</span>
              </div>
              <span className="font-bold text-xl">
                Oshus<span className="text-coral">Store</span>
              </span>
            </Link>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
              {heading}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-8">
              {description}
            </p>
            <ul className="flex flex-col gap-3 text-sm text-white/90">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-cart-yellow shrink-0" />
                Secure checkout with Paystack
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-cart-yellow shrink-0" />
                Free shipping on orders over ₦50,000
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-cart-yellow shrink-0" />
                Track orders anytime from your account
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
