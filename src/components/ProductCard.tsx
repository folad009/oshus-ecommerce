"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";
import { formatNaira } from "@/lib/currency";
import { useCart } from "@/store/cart-provider";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addItem } = useCart();
  const detailHref = `/shop/${product.id}`;

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    });
  }

  if (variant === "compact") {
    return (
      <div className="relative bg-white rounded-xl border border-border p-3 group hover:shadow-md transition-shadow">
        <Link
          href={detailHref}
          className="relative aspect-square rounded-lg overflow-hidden mb-2 block"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <Badge className="absolute top-2 left-2 bg-coral text-white text-[10px] border-0">
              {product.badge}
            </Badge>
          )}
        </Link>
        <button
          type="button"
          className="absolute top-5 right-5 size-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Add to wishlist"
        >
          <Heart className="size-3.5 text-navy" />
        </button>
        <Link href={detailHref}>
          <h3 className="text-xs font-medium text-navy line-clamp-2 mb-1 hover:text-coral transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-1">
          {product.rating && (
            <>
              <Star className="size-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] text-muted-foreground">
                {product.rating}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-navy">
            {formatNaira(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] text-muted-foreground line-through">
              {formatNaira(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <article className="relative bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-shadow">
      <Link
        href={detailHref}
        className="relative aspect-square overflow-hidden block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-coral text-white text-xs border-0">
            {product.badge}
          </Badge>
        )}
      </Link>
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
        <button
          type="button"
          className="size-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-coral hover:text-white transition-colors pointer-events-auto"
          aria-label="Add to wishlist"
        >
          <Heart className="size-4" />
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          className="size-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-coral hover:text-white transition-colors pointer-events-auto"
          aria-label="Add to cart"
        >
          <ShoppingCart className="size-4" />
        </button>
      </div>
      <div className="p-4">
        <Link href={detailHref}>
          <h3 className="text-sm font-medium text-navy line-clamp-2 mb-2 min-h-10 hover:text-coral transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">
              {product.rating}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-navy">
              {formatNaira(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatNaira(product.originalPrice)}
              </span>
            )}
          </div>
          <Button
            type="button"
            size="icon"
            onClick={handleAddToCart}
            className="size-8 rounded-full bg-navy hover:bg-coral text-white"
            aria-label="Add to cart"
          >
            <ShoppingCart className="size-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
