"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatNaira } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import {
  productApprovalStatusStyles,
  type CatalogProduct,
} from "@/data/catalog-products";

export function ProductApprovalsPanel() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actingId, setActingId] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products");
      const data = (await res.json()) as {
        products?: CatalogProduct[];
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Failed to load vendor submissions.");
        return;
      }

      setProducts(data.products ?? []);
    } catch {
      setError("Failed to load vendor submissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  async function updateStatus(
    id: string,
    status: "approved" | "rejected"
  ) {
    setActingId(id);
    setError("");
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to update product.");
        return;
      }

      await loadProducts();
    } catch {
      setError("Failed to update product.");
    } finally {
      setActingId(null);
    }
  }

  const pending = products.filter((product) => product.status === "pending");
  const reviewed = products.filter((product) => product.status !== "pending");

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold text-foreground">
            Pending approval
          </h2>
          <p className="text-sm text-muted-foreground">
            Vendor products waiting to go live in the store
          </p>
        </div>

        {error && (
          <p className="text-sm text-coral px-5 py-3" role="alert">
            {error}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-light-gray text-left">
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Product
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Vendor
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Category
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Price
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Submitted
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
                    Loading submissions...
                  </td>
                </tr>
              ) : pending.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-sm text-muted-foreground text-center"
                  >
                    No products pending approval.
                  </td>
                </tr>
              ) : (
                pending.map((product) => (
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
                      {product.vendorEmail}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-foreground">
                      {formatNaira(product.price)}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {product.submittedAt}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          disabled={actingId === product.id}
                          onClick={() => void updateStatus(product.id, "approved")}
                          className="bg-forest hover:bg-forest-dark text-white h-8 text-xs"
                        >
                          Approve
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={actingId === product.id}
                          onClick={() => void updateStatus(product.id, "rejected")}
                          className="h-8 text-xs border-coral text-coral hover:bg-coral/10"
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {reviewed.length > 0 && (
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-bold text-foreground">
              Reviewed submissions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-light-gray text-left">
                  <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                    Product
                  </th>
                  <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                    Vendor
                  </th>
                  <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                    Status
                  </th>
                  <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                    Reviewed
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviewed.map((product) => {
                  const status = productApprovalStatusStyles[product.status];
                  return (
                    <tr
                      key={product.id}
                      className="border-t border-border hover:bg-light-gray/50 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                        {product.name}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">
                        {product.vendorEmail}
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
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">
                        {product.reviewedAt ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
