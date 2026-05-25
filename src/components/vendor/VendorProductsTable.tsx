import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/currency";
import { vendorProducts, type VendorProduct } from "@/data/vendor";

interface VendorProductsTableProps {
  products?: VendorProduct[];
}

export function VendorProductsTable({
  products = vendorProducts,
}: VendorProductsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Your Products</h2>
        <button
          type="button"
          className="text-sm bg-navy-light hover:bg-navy text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-light-gray text-left">
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Product
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Category
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Price
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Stock
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Sales
              </th>
              <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-border hover:bg-light-gray/50 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 rounded-lg overflow-hidden shrink-0 bg-light-gray">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">
                  {product.category}
                </td>
                <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                  {formatNaira(product.price)}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      product.stock < 15
                        ? "text-coral"
                        : "text-foreground"
                    )}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-foreground">
                  {product.sales}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <Link
                      href={`/shop/${product.id}`}
                      className="text-xs text-navy-light font-medium hover:underline"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      className="text-xs text-muted-foreground font-medium hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
