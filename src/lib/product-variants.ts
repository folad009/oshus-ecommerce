export type ProductVariantOption = {
  id?: string;
  sku: string;
  weight: string;
  packSize: string;
  flavour: string;
  price: string;
  originalPrice: string;
  stock: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  weight: string;
  packSize: string;
  flavour: string;
  price: number;
  originalPrice: number;
  stock: number;
  label: string;
};

export function emptyVariantRow(): ProductVariantOption {
  return {
    sku: "",
    weight: "",
    packSize: "",
    flavour: "",
    price: "",
    originalPrice: "",
    stock: "0",
  };
}

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

export function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b, undefined, { numeric: true })
  );
}

export function findMatchingVariant(
  variants: ProductVariant[],
  selection: { weight: string; packSize: string; flavour: string }
): ProductVariant | undefined {
  return variants.find(
    (variant) =>
      variant.weight === selection.weight &&
      variant.packSize === selection.packSize &&
      variant.flavour === selection.flavour
  );
}

export function availableOptionValues(
  variants: ProductVariant[],
  key: "weight" | "packSize" | "flavour",
  filters: Partial<{ weight: string; packSize: string; flavour: string }>
): string[] {
  const filtered = variants.filter((variant) => {
    if (filters.weight && key !== "weight" && variant.weight !== filters.weight) {
      return false;
    }
    if (
      filters.packSize &&
      key !== "packSize" &&
      variant.packSize !== filters.packSize
    ) {
      return false;
    }
    if (
      filters.flavour &&
      key !== "flavour" &&
      variant.flavour !== filters.flavour
    ) {
      return false;
    }
    return Boolean(variant[key]);
  });

  return uniqueSorted(filtered.map((variant) => variant[key]));
}
