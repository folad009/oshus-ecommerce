import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface SpecialOfferSectionProps {
  products: Product[];
}

export function SpecialOfferSection({ products }: SpecialOfferSectionProps) {
  const offerProducts = products
    .filter(
      (product) =>
        product.originalPrice != null && product.originalPrice > product.price
    )
    .slice(0, 4);

  const displayProducts =
    offerProducts.length > 0 ? offerProducts : products.slice(0, 4);

  const heroProduct = displayProducts[0];

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5 bg-cream rounded-2xl p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between min-h-80">
            <div>
              <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                Special Offer
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy mt-2 mb-3">
                Under Our
                <br />
                Best Picks!
              </h2>
              <Link
                href="/shop"
                className={cn(
                  buttonVariants(),
                  "bg-brand hover:bg-brand-dark text-white rounded-full px-6 h-10 text-sm font-semibold"
                )}
              >
                Shop all deals
              </Link>
            </div>
            {heroProduct && (
              <div className="absolute bottom-0 right-0 w-48 h-48 lg:w-56 lg:h-80">
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  className="object-cover rounded-tr-3xl"
                  sizes="(max-width: 1024px) 192px, 224px"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {displayProducts.length === 0 ? (
              <p className="col-span-full text-sm text-muted-foreground py-8 text-center">
                No products available yet.
              </p>
            ) : (
              displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="compact"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
