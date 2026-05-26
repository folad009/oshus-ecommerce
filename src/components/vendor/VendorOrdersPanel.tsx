"use client";

import { useEffect, useState } from "react";
import { VendorOrdersTable } from "@/components/vendor/VendorOrdersTable";
import type { VendorOrder } from "@/data/vendor";

export function VendorOrdersPanel({
  showViewAll = false,
}: {
  showViewAll?: boolean;
}) {
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/vendor/orders");
        const data = (await res.json()) as {
          orders?: VendorOrder[];
          error?: string;
        };

        if (!res.ok) {
          if (!cancelled) {
            setError(data.error ?? "Failed to load orders.");
          }
          return;
        }

        if (!cancelled) {
          setOrders(data.orders ?? []);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load orders. Is the backend running?");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        Loading orders…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-coral py-8 text-center" role="alert">
        {error}
      </p>
    );
  }

  return <VendorOrdersTable orders={orders} showViewAll={showViewAll} />;
}
