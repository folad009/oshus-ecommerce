import Image from "next/image";
import { trackedOrder } from "@/data/track-order";

export function TrackOrderProducts() {
  const { products } = trackedOrder;

  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
      <h2 className="text-base font-bold text-foreground mb-6">Products</h2>

      <div className="flex flex-col">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 py-4 border-b border-border last:border-0"
          >
            <div className="relative size-16 rounded-lg overflow-hidden shrink-0 bg-light-gray">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {product.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Color: {product.color} | {product.quantity} Qty.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
