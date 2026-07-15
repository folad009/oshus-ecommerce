"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { useShopCategories } from "@/hooks/useShopCategories";
import {
  productApprovalStatusStyles,
  type CatalogProduct,
} from "@/data/catalog-products";
import { ProductFormFields } from "@/components/products/ProductFormFields";
import {
  emptyProductForm,
  productFormToPayload,
  type ProductFormData,
} from "@/lib/product-form";

export function VendorProductsPanel() {
  const { categories } = useShopCategories();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState<ProductFormData>(emptyProductForm);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/vendor/products");
      const data = (await res.json()) as {
        products?: CatalogProduct[];
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Failed to load products.");
        return;
      }

      setProducts(data.products ?? []);
    } catch {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.images.length === 0) {
      setError("Upload at least one product image.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/vendor/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productFormToPayload(form)),
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to submit product.");
        return;
      }

      setSuccess(
        data.message ??
          "Product submitted. An admin must approve it before it appears in the store."
      );
      setForm(emptyProductForm);
      await loadProducts();
    } catch {
      setError("Failed to submit product.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl border border-border shadow-sm p-5 md:p-6">
        <h2 className="text-base font-bold text-foreground mb-1">
          Add new product
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          New listings stay hidden from the shop until an admin approves them.
        </p>

        {error && (
          <p className="text-sm text-coral mb-4" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-forest mb-4" role="status">
            {success}
          </p>
        )}

        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <ProductFormFields
            form={form}
            categories={categories}
            disabled={submitting}
            onChange={(field, value) =>
              setForm((prev) => ({ ...prev, [field]: value }))
            }
            onImagesChange={(images) =>
              setForm((prev) => ({ ...prev, images }))
            }
            onVariantsChange={(variants) =>
              setForm((prev) => ({ ...prev, variants }))
            }
          />
          <Button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 w-full md:w-auto bg-navy-light hover:bg-navy text-white rounded-lg h-11 text-sm font-semibold px-8"
          >
            {submitting ? "Submitting..." : "Submit for approval"}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold text-foreground">Your products</h2>
          <p className="text-sm text-muted-foreground">
            Approved products are live in the store
          </p>
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
                  Status
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-sm text-muted-foreground text-center"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-sm text-muted-foreground text-center"
                  >
                    No products yet. Add your first product above.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const status = productApprovalStatusStyles[product.status];
                  return (
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
                      <td className="px-5 py-3.5 text-sm text-foreground">
                        {product.stock}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                            status.className
                          )}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {product.status === "approved" ? (
                          <Link
                            href={`/shop/${product.id}`}
                            className="text-xs text-navy-light font-medium hover:underline"
                          >
                            View in store
                          </Link>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            {product.status === "pending"
                              ? "Awaiting admin"
                              : "Not published"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
