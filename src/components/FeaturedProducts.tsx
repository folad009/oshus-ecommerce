import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Price } from "@/components/Price";
import type { ShopProduct } from "@/types";

const bannerStyles = [
  {
    container: "bg-navy",
    title: "text-white",
    subtitle: "text-white/60",
    price: "text-white",
  },
  {
    container: "bg-[#E8A090]",
    title: "text-white",
    subtitle: "text-white/80",
    price: "text-white",
  },
  {
    container: "bg-cream",
    title: "text-navy",
    subtitle: "text-navy/60",
    price: "text-navy",
  },
] as const;

interface FeaturedProductsProps {
  products: ShopProduct[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featured = products.slice(0, 3);

  return (
    <section className="py-10 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy">Featured Products</h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button
                type="button"
                className="size-8 rounded-full border border-border bg-white flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                className="size-8 rounded-full border border-border bg-navy text-white flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
            <Button
              variant="ghost"
              className="text-coral text-sm font-semibold hover:text-coral-dark gap-1"
              asChild
            >
              <Link href="/shop">
                See all
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {featured.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No featured products yet. Check back soon.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {featured.map((product, index) => {
              const style = bannerStyles[index % bannerStyles.length];
              const isLight = style.container === "bg-cream";

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  className={`${style.container} rounded-2xl p-6 relative overflow-hidden h-32 flex flex-col justify-between group hover:shadow-md transition-shadow`}
                >
                  <div>
                    <h3
                      className={`${style.title} text-lg font-bold mb-1 line-clamp-1`}
                    >
                      {product.name}
                    </h3>
                    <p className={`${style.subtitle} text-xs mb-3 line-clamp-1`}>
                      {product.category}
                      {product.discount ? ` · ${product.discount}` : ""}
                    </p>
                  </div>
                  {isLight ? (
                    <Button className="w-fit bg-coral hover:bg-coral-dark text-white rounded-full px-5 h-9 text-xs font-semibold gap-1.5 pointer-events-none">
                      Shop Now
                      <ArrowRight className="size-3" />
                    </Button>
                  ) : (
                    <span className={`${style.price} text-2xl font-bold`}>
                      <Price amountNgn={product.price} />
                    </span>
                  )}
                  <div className="absolute bottom-0 right-0 w-32 h-32">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-tr-3xl group-hover:scale-105 transition-transform duration-300"
                      sizes="128px"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
