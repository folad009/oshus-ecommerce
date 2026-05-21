import { Truck, CreditCard, Headphones } from "lucide-react";
import { shopFeatures } from "@/data/shop";

const iconMap = {
  truck: Truck,
  "credit-card": CreditCard,
  headphones: Headphones,
} as const;

interface ShopFeaturesBarProps {
  iconVariant?: "gold" | "yellow";
}

export function ShopFeaturesBar({ iconVariant = "gold" }: ShopFeaturesBarProps) {
  const iconBg =
    iconVariant === "yellow" ? "bg-cart-yellow/20" : "bg-gold/15";
  const iconColor = iconVariant === "yellow" ? "text-cart-yellow" : "text-gold";

  return (
    <section className="border-t border-border bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shopFeatures.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.title}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div
                  className={`size-12 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}
                >
                  <Icon className={`size-5 ${iconColor}`} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
