import { Logo } from "@/components/Logo";

type AuthPanelVariant = "customer" | "vendor" | "admin" | "support";

interface AuthSplitPanelProps {
  heading: string;
  description: string;
  children: React.ReactNode;
  variant?: AuthPanelVariant;
}

const panelBullets: Record<AuthPanelVariant, string[]> = {
  customer: [
    "Secure checkout with Paystack",
    "Free shipping on orders over ₦50,000",
    "Track orders anytime from your account",
  ],
  vendor: [
    "Manage products and inventory",
    "Track orders and fulfillment",
    "View earnings and Paystack payouts",
  ],
  admin: [
    "Manage products and catalog",
    "Oversee orders and customers",
    "Track fulfillment across the store",
  ],
  support: [
    "Respond to customer tickets",
    "Look up and track orders",
    "Assist customers in real time",
  ],
};

const panelClasses: Record<AuthPanelVariant, string> = {
  customer: "bg-navy text-white",
  vendor: "bg-navy-light text-white",
  admin: "bg-navy text-white",
  support: "bg-navy-light text-white",
};

export function AuthSplitPanel({
  heading,
  description,
  children,
  variant = "customer",
}: AuthSplitPanelProps) {
  const bullets = panelBullets[variant];

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border shadow-sm min-h-[520px]">
          <div
            className={`${panelClasses[variant]} p-8 md:p-12 flex flex-col justify-center`}
          >
            <Logo
              size="md"
              className="mb-8"
              textClassName="text-white"
              accentClassName="text-brand"
            />
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
              {heading}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-8">
              {description}
            </p>
            <ul className="flex flex-col gap-3 text-sm text-white/90">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand shrink-0" />
                  {item}
                </li>
              ))}
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
