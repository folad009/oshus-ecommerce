import { ProductCard } from "@/components/ProductCard";
import { Sidebar } from "@/components/Sidebar";
import { products } from "@/data/products";

export function CategoriesSection() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-navy mb-6">Categories</h2>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Products Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
