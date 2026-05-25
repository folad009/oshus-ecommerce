import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import {
  getProductDetail,
  getRelatedProducts,
} from "@/data/product-detail";
import { notFound } from "next/navigation";

interface ProductDetailContentProps {
  productId: string;
}

export async function ProductDetailContent({
  productId,
}: ProductDetailContentProps) {
  const product = await getProductDetail(productId);
  if (!product) notFound();

  const related = await getRelatedProducts(product.id, product.category);

  return (
    <>
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>
          <ProductTabs product={product} />
        </div>
      </section>
      <RelatedProducts products={related} />
    </>
  );
}
