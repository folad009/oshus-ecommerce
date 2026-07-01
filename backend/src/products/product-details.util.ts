import type { Prisma } from "@prisma/client";
import type { ProductDetailsFieldsDto } from "./dto/product-details.dto";

export type AdditionalInfoRow = { label: string; value: string };

export function toAdditionalInfoJson(
  rows: AdditionalInfoRow[]
): Prisma.InputJsonValue {
  return rows.map(({ label, value }) => ({ label, value })) as Prisma.InputJsonValue;
}

export function parseAdditionalInfo(value: Prisma.JsonValue): AdditionalInfoRow[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (
      typeof entry === "object" &&
      entry !== null &&
      "label" in entry &&
      "value" in entry &&
      typeof entry.label === "string" &&
      typeof entry.value === "string"
    ) {
      return [{ label: entry.label, value: entry.value }];
    }
    return [];
  });
}

export function normalizeProductDetails(dto: ProductDetailsFieldsDto) {
  return {
    sku: dto.sku?.trim() ?? "",
    shortDescription: dto.shortDescription?.trim() ?? "",
    description: (dto.description ?? []).map((p) => p.trim()).filter(Boolean),
    descriptionBullets: (dto.descriptionBullets ?? [])
      .map((b) => b.trim())
      .filter(Boolean),
    tags: (dto.tags ?? []).map((t) => t.trim()).filter(Boolean),
    sizes: (dto.sizes ?? []).map((s) => s.trim()).filter(Boolean),
    additionalInfo: (dto.additionalInfo ?? []).filter(
      (row) => row.label.trim().length > 0
    ),
  };
}

export function formatProductDetails(product: {
  sku: string;
  shortDescription: string;
  description: string[];
  descriptionBullets: string[];
  tags: string[];
  sizes: string[];
  additionalInfo: Prisma.JsonValue;
  category: string;
  stock: number;
}) {
  const additionalInfo = parseAdditionalInfo(product.additionalInfo);

  return {
    sku: product.sku,
    shortDescription: product.shortDescription,
    description: product.description,
    descriptionBullets: product.descriptionBullets,
    tags: product.tags.length > 0 ? product.tags : [product.category],
    sizes: product.sizes.length > 0 ? product.sizes : ["Standard"],
    additionalInfo:
      additionalInfo.length > 0
        ? additionalInfo
        : [
            { label: "Category", value: product.category },
            { label: "Brand", value: "Oshus Store" },
          ],
    inStock: product.stock > 0,
  };
}
