import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { specialProducts } from "@/data/products";

export function SpecialOfferSection() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-4">
          {/* Large Banner */}
          <div className="lg:col-span-5 bg-cream rounded-2xl p-6 lg:p-8 relative overflow-hidden flex flex-col justify-between h-80">
            <div>
              <span className="text-xs font-semibold text-coral uppercase tracking-wider">
                Special Offer
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy mt-2 mb-3">
                Under Our
                <br />
                Best Picks!
              </h2>
              <Button className="bg-coral hover:bg-coral-dark text-white rounded-full px-6 h-10 text-sm font-semibold">
                Up to 50% Off
              </Button>
            </div>
            <div className="absolute bottom-0 right-0 w-48 h-48 lg:w-56 lg:h-80">
              <Image
                src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=400&fit=crop"
                alt="Special offer products"
                fill
                className="object-cover rounded-tr-3xl"
              />
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 h-20">
            {specialProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
