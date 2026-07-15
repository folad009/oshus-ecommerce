"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Star, Globe, MessageCircle, Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductDetail } from "@/types";
import { useCurrency } from "@/store/currency-provider";
import { useCart } from "@/store/cart-provider";
import {
  availableOptionValues,
  findMatchingVariant,
  uniqueSorted,
} from "@/lib/product-variants";

interface ProductInfoProps {
  product: ProductDetail;
}

function OptionGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  if (options.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-foreground mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium border transition-colors",
              selected === option
                ? "bg-white text-foreground border-forest ring-1 ring-forest"
                : "bg-white text-foreground border-border hover:border-forest"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { formatFromNgn } = useCurrency();
  const variants = product.variants ?? [];
  const hasVariants = variants.length > 0;

  const initialVariant = variants[0];
  const [weight, setWeight] = useState(initialVariant?.weight ?? "");
  const [packSize, setPackSize] = useState(initialVariant?.packSize ?? "");
  const [flavour, setFlavour] = useState(initialVariant?.flavour ?? "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "Standard");
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");

  const weights = useMemo(
    () => uniqueSorted(variants.map((variant) => variant.weight)),
    [variants]
  );
  const packSizes = useMemo(
    () =>
      availableOptionValues(variants, "packSize", {
        weight,
        flavour,
      }),
    [variants, weight, flavour]
  );
  const flavours = useMemo(
    () =>
      availableOptionValues(variants, "flavour", {
        weight,
        packSize,
      }),
    [variants, weight, packSize]
  );

  const selectedVariant = useMemo(() => {
    if (!hasVariants) {
      return undefined;
    }

    return (
      findMatchingVariant(variants, { weight, packSize, flavour }) ??
      variants.find(
        (variant) =>
          (!weight || variant.weight === weight) &&
          (!packSize || variant.packSize === packSize) &&
          (!flavour || variant.flavour === flavour)
      ) ??
      variants[0]
    );
  }, [hasVariants, variants, weight, packSize, flavour]);

  const displayPrice = selectedVariant?.price ?? product.price;
  const displayOriginalPrice =
    selectedVariant?.originalPrice ?? product.originalPrice;
  const displaySku = selectedVariant?.sku || product.sku;
  const inStock = selectedVariant
    ? selectedVariant.stock > 0
    : product.inStock;
  const titleSuffix =
    selectedVariant &&
    (selectedVariant.packSize || selectedVariant.weight)
      ? ` (${[
          selectedVariant.packSize && selectedVariant.weight
            ? `${selectedVariant.packSize} x ${selectedVariant.weight}`
            : selectedVariant.weight || `Pack of ${selectedVariant.packSize}`,
        ].join("")})`
      : "";

  function selectWeight(value: string) {
    setWeight(value);
    const nextPacks = availableOptionValues(variants, "packSize", {
      weight: value,
      flavour,
    });
    const nextPack = nextPacks.includes(packSize) ? packSize : nextPacks[0] ?? "";
    setPackSize(nextPack);
    const nextFlavours = availableOptionValues(variants, "flavour", {
      weight: value,
      packSize: nextPack,
    });
    if (!nextFlavours.includes(flavour)) {
      setFlavour(nextFlavours[0] ?? "");
    }
  }

  function selectPackSize(value: string) {
    setPackSize(value);
    const nextFlavours = availableOptionValues(variants, "flavour", {
      weight,
      packSize: value,
    });
    if (!nextFlavours.includes(flavour)) {
      setFlavour(nextFlavours[0] ?? "");
    }
  }

  function cartPayload() {
    if (selectedVariant) {
      return {
        id: selectedVariant.id,
        productId: product.id,
        variantId: selectedVariant.id,
        variantLabel: selectedVariant.label,
        name: `${product.name}${titleSuffix}`,
        category: product.category,
        price: selectedVariant.price,
        image: product.image,
      };
    }

    return {
      id: product.id,
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    };
  }

  function handleAddToCart() {
    if (hasVariants && !selectedVariant) {
      setFeedback("Please select a valid pack option.");
      return;
    }
    if (hasVariants && selectedVariant && selectedVariant.stock < 1) {
      setFeedback("This option is out of stock.");
      return;
    }

    addItem(cartPayload(), quantity);
    setFeedback("Added to cart.");
  }

  function handleBuyNow() {
    if (hasVariants && !selectedVariant) {
      setFeedback("Please select a valid pack option.");
      return;
    }
    if (hasVariants && selectedVariant && selectedVariant.stock < 1) {
      setFeedback("This option is out of stock.");
      return;
    }

    addItem(cartPayload(), quantity);
    router.push("/checkout");
  }

  return (
    <div>
      <span className="text-xs text-muted-foreground">{product.category}</span>

      <h2 className="font-serif text-3xl md:text-4xl text-foreground font-semibold mt-1 mb-3">
        {product.name}
        {selectedVariant?.flavour ? ` ${selectedVariant.flavour}` : ""}
        {titleSuffix}
      </h2>

      {inStock ? (
        <span className="inline-block text-xs font-medium text-forest bg-forest/10 px-3 py-1 rounded-full mb-4">
          In Stock
        </span>
      ) : (
        <span className="inline-block text-xs font-medium text-coral bg-coral/10 px-3 py-1 rounded-full mb-4">
          Out of Stock
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
          {formatFromNgn(displayPrice)}
        </span>
        {displayOriginalPrice > displayPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatFromNgn(displayOriginalPrice)}
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {product.shortDescription}
      </p>

      {hasVariants ? (
        <>
          <OptionGroup
            label="Quantity"
            options={weights}
            selected={weight}
            onSelect={selectWeight}
          />
          <OptionGroup
            label="Pack of"
            options={packSizes}
            selected={packSize}
            onSelect={selectPackSize}
          />
          <OptionGroup
            label="Flavour"
            options={flavours}
            selected={flavour}
            onSelect={setFlavour}
          />
        </>
      ) : (
        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-3">Size/Volume</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium border transition-colors",
                  selectedSize === size
                    ? "bg-white text-foreground border-forest ring-1 ring-forest"
                    : "bg-white text-foreground border-border hover:border-forest"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {feedback && (
        <p className="text-sm text-forest mb-4" role="status">
          {feedback}
        </p>
      )}

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

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className={cn(
            buttonVariants(),
            "bg-forest hover:bg-forest-dark text-white rounded-lg h-11 px-6 text-sm font-semibold disabled:opacity-50"
          )}
        >
          Add To Cart
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!inStock}
          className={cn(
            buttonVariants(),
            "bg-gold hover:bg-gold/90 text-white rounded-lg h-11 px-6 text-sm font-semibold disabled:opacity-50"
          )}
        >
          Buy Now
        </button>

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
          <span className="text-foreground font-medium">{displaySku}</span>
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
