import { UnprocessableEntityException } from "@nestjs/common";
import type { ProductVariantDto } from "./dto/product-variant.dto";

export type NormalizedVariant = {
  sku: string;
  weight: string;
  packSize: string;
  flavour: string;
  price: number;
  originalPrice: number;
  stock: number;
};

export type FormattedVariant = NormalizedVariant & {
  id: string;
  label: string;
};

export function formatVariantLabel(variant: {
  weight: string;
  packSize: string;
  flavour: string;
}): string {
  const packAndWeight =
    variant.packSize && variant.weight
      ? `${variant.packSize} x ${variant.weight}`
      : variant.weight ||
        (variant.packSize ? `Pack of ${variant.packSize}` : "");

  if (variant.flavour && packAndWeight) {
    return `${variant.flavour} (${packAndWeight})`;
  }

  return variant.flavour || packAndWeight || "Standard";
}

export function normalizeVariants(
  variants: ProductVariantDto[] | undefined
): NormalizedVariant[] {
  if (!variants) {
    return [];
  }

  const normalized = variants.map((variant, index) => {
    const weight = variant.weight?.trim() ?? "";
    const packSize = variant.packSize?.trim() ?? "";
    const flavour = variant.flavour?.trim() ?? "";
    const price = Math.round(variant.price);
    const originalPrice = Math.round(variant.originalPrice);
    const stock = Math.max(0, Math.round(variant.stock));

    if (!weight && !packSize && !flavour) {
      throw new UnprocessableEntityException(
        `Variant ${index + 1} needs at least one of Weight, Pack size, or Flavour.`
      );
    }

    if (price < 1 || originalPrice < 1) {
      throw new UnprocessableEntityException(
        `Variant ${index + 1} must have a valid price.`
      );
    }

    return {
      sku: variant.sku?.trim() ?? "",
      weight,
      packSize,
      flavour,
      price,
      originalPrice,
      stock,
    };
  });

  const keys = new Set<string>();
  for (const variant of normalized) {
    const key = `${variant.weight}|${variant.packSize}|${variant.flavour}`;
    if (keys.has(key)) {
      throw new UnprocessableEntityException(
        "Duplicate variant attributes. Each Weight + Pack + Flavour combo must be unique."
      );
    }
    keys.add(key);
  }

  return normalized;
}

export function deriveProductPricing(variants: NormalizedVariant[]) {
  if (variants.length === 0) {
    return null;
  }

  const priced = [...variants].sort((a, b) => a.price - b.price);
  const cheapest = priced[0]!;
  const stock = variants.reduce((sum, variant) => sum + variant.stock, 0);
  const sizes = [
    ...new Set(variants.map((variant) => variant.weight).filter(Boolean)),
  ];

  return {
    price: cheapest.price,
    originalPrice: cheapest.originalPrice,
    stock,
    sizes,
    sku: cheapest.sku,
  };
}

export function formatVariants(
  variants: Array<{
    id: string;
    sku: string;
    weight: string;
    packSize: string;
    flavour: string;
    price: number;
    originalPrice: number;
    stock: number;
  }>
): FormattedVariant[] {
  return variants.map((variant) => ({
    id: variant.id,
    sku: variant.sku,
    weight: variant.weight,
    packSize: variant.packSize,
    flavour: variant.flavour,
    price: variant.price,
    originalPrice: variant.originalPrice,
    stock: variant.stock,
    label: formatVariantLabel(variant),
  }));
}
