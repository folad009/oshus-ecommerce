export type AdditionalInfoRow = { label: string; value: string };

export type ProductFormData = {
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  images: string[];
  stock: string;
  vendorEmail: string;
  sku: string;
  shortDescription: string;
  descriptionText: string;
  descriptionBulletsText: string;
  tagsText: string;
  sizesText: string;
  additionalInfoText: string;
};

export const emptyProductForm: ProductFormData = {
  name: "",
  category: "",
  price: "",
  originalPrice: "",
  images: [],
  stock: "10",
  vendorEmail: "",
  sku: "",
  shortDescription: "",
  descriptionText: "",
  descriptionBulletsText: "",
  tagsText: "",
  sizesText: "",
  additionalInfoText: "",
};

export function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function parseCommaList(text: string): string[] {
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseAdditionalInfo(text: string): AdditionalInfoRow[] {
  return parseLines(text).flatMap((line) => {
    const separator = line.indexOf(":");
    if (separator === -1) {
      return [];
    }

    const label = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!label) {
      return [];
    }

    return [{ label, value }];
  });
}

export function formatLines(items: string[]): string {
  return items.join("\n");
}

export function formatParagraphs(items: string[]): string {
  return items.join("\n\n");
}

export function formatCommaList(items: string[]): string {
  return items.join(", ");
}

export function formatAdditionalInfo(rows: AdditionalInfoRow[]): string {
  return rows.map((row) => `${row.label}: ${row.value}`).join("\n");
}

export function productFormToPayload(form: ProductFormData, includeVendor = false) {
  const price = Number(form.price);
  const originalPrice = Number(form.originalPrice || form.price);

  const payload: Record<string, string | number | string[] | AdditionalInfoRow[]> = {
    name: form.name,
    category: form.category,
    price,
    originalPrice,
    images: form.images,
    stock: Number(form.stock),
    sku: form.sku.trim(),
    shortDescription: form.shortDescription.trim(),
    description: parseParagraphs(form.descriptionText),
    descriptionBullets: parseLines(form.descriptionBulletsText),
    tags: parseCommaList(form.tagsText),
    sizes: parseCommaList(form.sizesText),
    additionalInfo: parseAdditionalInfo(form.additionalInfoText),
  };

  if (includeVendor && form.vendorEmail.trim()) {
    payload.vendorEmail = form.vendorEmail.trim();
  }

  return payload;
}

export function catalogProductToForm(product: {
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  stock: number;
  vendorEmail?: string;
  sku?: string;
  shortDescription?: string;
  description?: string[];
  descriptionBullets?: string[];
  tags?: string[];
  sizes?: string[];
  additionalInfo?: AdditionalInfoRow[];
}): ProductFormData {
  return {
    name: product.name,
    category: product.category,
    price: String(product.price),
    originalPrice: String(product.originalPrice),
    images:
      product.images.length > 0
        ? product.images
        : product.image
          ? [product.image]
          : [],
    stock: String(product.stock),
    vendorEmail: product.vendorEmail ?? "",
    sku: product.sku ?? "",
    shortDescription: product.shortDescription ?? "",
    descriptionText: formatParagraphs(product.description ?? []),
    descriptionBulletsText: formatLines(product.descriptionBullets ?? []),
    tagsText: formatCommaList(product.tags ?? []),
    sizesText: formatCommaList(product.sizes ?? []),
    additionalInfoText: formatAdditionalInfo(product.additionalInfo ?? []),
  };
}
