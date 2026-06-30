import { ShopProductCard } from "@/components/shop/ShopProductCard";
import type { ShopProduct } from "@/types";

interface RelatedProductsProps {
  products: ShopProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Related Products
        </span>
        <h2 className="font-serif text-2xl md:text-3xl text-foreground font-semibold mt-1 mb-8">
          Explore Related Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ShopProductCard
              key={product.id}
              product={product}
              showHoverActions={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
