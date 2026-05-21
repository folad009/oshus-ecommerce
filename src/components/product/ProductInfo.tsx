"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Star, Globe, MessageCircle, Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductDetail } from "@/types";
import { formatNaira } from "@/lib/currency";

interface ProductInfoProps {
  product: ProductDetail;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(4);

  return (
    <div>
      <span className="text-xs text-muted-foreground">{product.category}</span>

      <h2 className="font-serif text-3xl md:text-4xl text-foreground font-semibold mt-1 mb-3">
        {product.name}
      </h2>

      {product.inStock && (
        <span className="inline-block text-xs font-medium text-forest bg-forest/10 px-3 py-1 rounded-full mb-4">
          In Stock
        </span>
      )}

      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < Math.floor(product.rating)
                  ? "fill-gold text-gold"
                  : "fill-mid-gray text-mid-gray"
              )}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {product.rating} ({product.reviewCount} Review)
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-gold">
          {formatNaira(product.price)}
        </span>
        <span className="text-lg text-muted-foreground line-through">
          {formatNaira(product.originalPrice)}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {product.shortDescription}
      </p>

      <div className="mb-6">
        <p className="text-sm font-semibold text-foreground mb-3">Size/Volume</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                selectedSize === size
                  ? "bg-forest text-white border-forest"
                  : "bg-white text-foreground border-border hover:border-forest"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="size-11 flex items-center justify-center hover:bg-light-gray transition-colors"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="size-11 flex items-center justify-center hover:bg-light-gray transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <Link
          href="/cart"
          className={cn(
            buttonVariants(),
            "bg-forest hover:bg-forest-dark text-white rounded-lg h-11 px-6 text-sm font-semibold"
          )}
        >
          Add To Cart
        </Link>

        <Link
          href="/checkout"
          className={cn(
            buttonVariants(),
            "bg-gold hover:bg-gold/90 text-white rounded-lg h-11 px-6 text-sm font-semibold"
          )}
        >
          Buy Now
        </Link>

        <button
          type="button"
          className="size-11 rounded-lg border border-border flex items-center justify-center hover:bg-light-gray transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="size-5 text-foreground" />
        </button>
      </div>

      <div className="flex flex-col gap-2 text-sm border-t border-border pt-6">
        <div className="flex gap-2">
          <span className="text-muted-foreground w-12 shrink-0">SKU:</span>
          <span className="text-foreground font-medium">{product.sku}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-muted-foreground w-12 shrink-0">Tags:</span>
          <span className="text-foreground">{product.tags.join(", ")}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground shrink-0">Share:</span>
          <div className="flex items-center gap-2">
            {[Globe, MessageCircle, Send].map((Icon, i) => (
              <button
                key={i}
                type="button"
                className="size-8 rounded-full border border-border flex items-center justify-center hover:bg-light-gray transition-colors"
                aria-label="Share product"
              >
                <Icon className="size-3.5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
