"use client";

import { useEffect, useState } from "react";
import { OrdersTable } from "@/components/admin/OrdersTable";
import type { AdminOrder } from "@/data/admin";

export function AdminOrdersPanel({ showViewAll = false }: { showViewAll?: boolean }) {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/orders");
        const data = (await res.json()) as {
          orders?: AdminOrder[];
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

  return <OrdersTable orders={orders} showViewAll={showViewAll} />;
}
