"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Expand, ShoppingBag, Star } from "lucide-react";
import type { ShopProduct } from "@/types";
import { useCurrency } from "@/store/currency-provider";
import { useCart } from "@/store/cart-provider";

interface ShopProductCardProps {
  product: ShopProduct;
  showHoverActions?: boolean;
}

export function ShopProductCard({
  product,
  showHoverActions = false,
}: ShopProductCardProps) {
  const { addItem } = useCart();
  const { formatFromNgn } = useCurrency();

  function handleAddToCart(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    });
  }

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-light-gray mb-3">
        <Link
          href={`/shop/${product.id}`}
          className="block absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>
        <span className="absolute top-3 left-3 bg-forest text-white text-[10px] font-semibold px-2 py-0.5 rounded z-10 pointer-events-none">
          {product.discount}
        </span>
        {showHoverActions && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 z-10">
            <button
              type="button"
              className="size-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-forest hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="size-4" />
            </button>
            <Link
              href={`/shop/${product.id}`}
              className="size-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-forest hover:text-white transition-colors"
              aria-label="Quick view"
            >
              <Expand className="size-4" />
            </Link>
            <button
              type="button"
              onClick={handleAddToCart}
              className="size-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-forest hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingBag className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-muted-foreground">{product.category}</span>
        <div className="flex items-center gap-1">
          <Star className="size-3 fill-gold text-gold" />
          <span className="text-xs text-foreground/80">{product.rating}</span>
        </div>
      </div>

      <Link href={`/shop/${product.id}`}>
        <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-1 hover:text-forest transition-colors">
          {product.name}
        </h3>
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-forest">
          {formatFromNgn(product.price)}
        </span>
        <span className="text-xs text-muted-foreground line-through">
          {formatFromNgn(product.originalPrice)}
        </span>
      </div>
    </article>
  );
}
