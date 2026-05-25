import type { Metadata } from "next";
import { ProductPageHeader } from "@/components/product/ProductPageHeader";
import { ProductDetailContent } from "@/components/product/ProductDetailContent";
import { ShopFeaturesBar } from "@/components/shop/ShopFeaturesBar";
import { Footer } from "@/components/Footer";
import { getProductDetail } from "@/data/product-detail";
import { shopProducts } from "@/data/shop";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  return shopProducts.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductDetail(id);

  return {
    title: product
      ? `${product.name} | Oshus Store`
      : "Product | Oshus Store",
    description: product?.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <>
      <main className="flex-1 bg-white">
        <ProductPageHeader />
        <ProductDetailContent productId={id} />
        <ShopFeaturesBar />
      </main>
      <Footer />
    </>
  );
}
