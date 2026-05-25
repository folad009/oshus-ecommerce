import { promises as fs } from "fs";
import path from "path";
import {
  computeDiscount,
  type CatalogProduct,
  type ProductApprovalStatus,
} from "@/data/catalog-products";

const STORE_PATH = path.join(
  process.cwd(),
  "data",
  "catalog-products-store.json"
);

let cache: CatalogProduct[] | null = null;

async function persistProducts(products: CatalogProduct[]): Promise<void> {
  cache = products;
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(products, null, 2), "utf-8");
}

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  if (cache) {
    return cache;
  }

  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    cache = JSON.parse(raw) as CatalogProduct[];
    return cache;
  } catch {
    cache = [];
    await persistProducts(cache);
    return cache;
  }
}

export async function getCatalogProductById(
  id: string
): Promise<CatalogProduct | undefined> {
  const products = await getCatalogProducts();
  return products.find((product) => product.id === id);
}

export async function getVendorCatalogProducts(
  vendorEmail: string
): Promise<CatalogProduct[]> {
  const normalized = vendorEmail.trim().toLowerCase();
  const products = await getCatalogProducts();
  return products.filter(
    (product) => product.vendorEmail.toLowerCase() === normalized
  );
}

export async function addVendorCatalogProduct(input: {
  vendorEmail: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  stock: number;
}): Promise<CatalogProduct> {
  const products = await getCatalogProducts();
  const price = Math.round(input.price);
  const originalPrice = Math.round(input.originalPrice);

  const product: CatalogProduct = {
    id: `vendor-${Date.now()}`,
    vendorEmail: input.vendorEmail.trim().toLowerCase(),
    name: input.name.trim(),
    category: input.category.trim(),
    price,
    originalPrice: originalPrice > 0 ? originalPrice : price,
    image: input.image.trim(),
    rating: 0,
    discount: computeDiscount(price, originalPrice > 0 ? originalPrice : price),
    stock: Math.max(0, Math.round(input.stock)),
    status: "pending",
    submittedAt: new Date().toISOString().slice(0, 10),
  };

  await persistProducts([...products, product]);
  return product;
}

export async function updateCatalogProductStatus(
  id: string,
  status: ProductApprovalStatus
): Promise<CatalogProduct | { error: string }> {
  const products = await getCatalogProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return { error: "Product not found." };
  }

  const updated: CatalogProduct = {
    ...products[index],
    status,
    reviewedAt: new Date().toISOString().slice(0, 10),
    ...(status === "approved" && products[index].rating === 0
      ? { rating: 4.5 }
      : {}),
  };

  const next = [...products];
  next[index] = updated;
  await persistProducts(next);
  return updated;
}
