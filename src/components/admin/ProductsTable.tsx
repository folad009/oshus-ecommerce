"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
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
  catalogProductToForm,
  emptyProductForm,
  productFormToPayload,
  type ProductFormData,
} from "@/lib/product-form";

export function ProductsTable({
  apiBase = "/api/admin/products",
}: {
  apiBase?: string;
}) {
  const { categories } = useShopCategories();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<ProductFormData>(emptyProductForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProductFormData>(emptyProductForm);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(apiBase);
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
  }, [apiBase]);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  function buildPayload(form: ProductFormData, includeVendor = false) {
    return productFormToPayload(form, includeVendor);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (addForm.images.length === 0) {
      setError("Upload at least one product image.");
      return;
    }
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const res = await fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(addForm, true)),
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to create product.");
        return;
      }

      setSuccess(data.message ?? "Product created.");
      setAddForm(emptyProductForm);
      setShowAddForm(false);
      await loadProducts();
    } catch {
      setError("Failed to create product.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(product: CatalogProduct) {
    setEditingId(product.id);
    setEditForm(catalogProductToForm(product));
    setError("");
    setSuccess("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(emptyProductForm);
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;

    if (editForm.images.length === 0) {
      setError("Upload at least one product image.");
      return;
    }

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const res = await fetch(`${apiBase}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(editForm)),
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to update product.");
        return;
      }

      setSuccess(data.message ?? "Product updated.");
      setEditingId(null);
      setEditForm(emptyProductForm);
      await loadProducts();
    } catch {
      setError("Failed to update product.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${apiBase}/${id}`, {
        method: "DELETE",
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to delete product.");
        return;
      }

      setSuccess(data.message ?? "Product deleted.");
      if (editingId === id) {
        cancelEdit();
      }
      await loadProducts();
    } catch {
      setError("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  }

  const approvedProducts = products.filter(
    (product) => product.status === "approved"
  );

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <p className="text-sm text-coral" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-forest" role="status">
          {success}
        </p>
      )}

      {showAddForm && (
        <div className="bg-white rounded-xl border border-border shadow-sm p-5 md:p-6">
          <h3 className="text-base font-bold text-foreground mb-4">
            Add new product
          </h3>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <ProductFormFields
              form={addForm}
              showVendorEmail
              categories={categories}
              disabled={submitting}
              onChange={(field, value) =>
                setAddForm((prev) => ({ ...prev, [field]: value }))
              }
              onImagesChange={(images) =>
                setAddForm((prev) => ({ ...prev, images }))
              }
              onVariantsChange={(variants) =>
                setAddForm((prev) => ({ ...prev, variants }))
              }
            />
            <div className="md:col-span-2 flex gap-3">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 text-sm font-semibold px-8"
              >
                {submitting ? "Saving..." : "Save product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={submitting}
                onClick={() => {
                  setShowAddForm(false);
                  setAddForm(emptyProductForm);
                }}
                className="rounded-lg h-11 text-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {editingId && (
        <div className="bg-white rounded-xl border border-forest/30 shadow-sm p-5 md:p-6">
          <h3 className="text-base font-bold text-foreground mb-4">
            Edit product
          </h3>
          <form
            onSubmit={handleEdit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <ProductFormFields
              form={editForm}
              categories={categories}
              disabled={submitting}
              onChange={(field, value) =>
                setEditForm((prev) => ({ ...prev, [field]: value }))
              }
              onImagesChange={(images) =>
                setEditForm((prev) => ({ ...prev, images }))
              }
              onVariantsChange={(variants) =>
                setEditForm((prev) => ({ ...prev, variants }))
              }
            />
            <div className="md:col-span-2 flex gap-3">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 text-sm font-semibold px-8"
              >
                {submitting ? "Saving..." : "Update product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={submitting}
                onClick={cancelEdit}
                className="rounded-lg h-11 text-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-base font-bold text-foreground">All Products</h2>
            <p className="text-sm text-muted-foreground">
              Approved products live in the store
            </p>
          </div>
          {!showAddForm && !editingId && (
            <button
              type="button"
              onClick={() => {
                setShowAddForm(true);
                setError("");
                setSuccess("");
              }}
              className="text-sm bg-forest hover:bg-forest-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add Product
            </button>
          )}
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
              ) : approvedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-sm text-muted-foreground text-center"
                  >
                    No approved products yet. Add one or approve a vendor
                    submission above.
                  </td>
                </tr>
              ) : (
                approvedProducts.map((product) => {
                  const status = productApprovalStatusStyles[product.status];
                  const isDeleting = deletingId === product.id;

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
                            product.stock > 0
                              ? status.className
                              : "bg-red-100 text-red-800"
                          )}
                        >
                          {product.stock > 0 ? status.label : "Out of stock"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={isDeleting || submitting}
                            onClick={() => startEdit(product)}
                            className="text-xs text-forest font-medium hover:underline disabled:opacity-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={isDeleting || submitting}
                            onClick={() =>
                              void handleDelete(product.id, product.name)
                            }
                            className="text-xs text-coral font-medium hover:underline disabled:opacity-50"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </div>
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
