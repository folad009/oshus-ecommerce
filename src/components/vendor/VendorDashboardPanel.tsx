"use client";

import { useEffect, useState } from "react";
import { VendorStatCard } from "@/components/vendor/VendorStatCard";
import { VendorOrdersPanel } from "@/components/vendor/VendorOrdersPanel";
import { vendorOrderStatusStyles, type VendorStat } from "@/data/vendor";

interface DashboardResponse {
  stats: VendorStat[];
  pendingCount: number;
  lowStockCount: number;
  orderCounts?: Record<string, number>;
}

export function VendorDashboardPanel() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [orderCounts, setOrderCounts] = useState<Record<string, number>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [dashRes, ordersRes] = await Promise.all([
          fetch("/api/vendor/dashboard"),
          fetch("/api/vendor/orders"),
        ]);
        const dash = (await dashRes.json()) as DashboardResponse & {
          error?: string;
        };
        const ordersJson = (await ordersRes.json()) as {
          orders?: Array<{ status: string }>;
        };

        if (!dashRes.ok) {
          if (!cancelled) {
            setError(dash.error ?? "Failed to load dashboard.");
          }
          return;
        }

        const counts: Record<string, number> = {};
        for (const order of ordersJson.orders ?? []) {
          counts[order.status] = (counts[order.status] ?? 0) + 1;
        }

        if (!cancelled) {
          setData(dash);
          setOrderCounts(counts);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load dashboard. Is the backend running?");
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <p className="text-sm text-coral py-8 text-center" role="alert">
        {error}
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        Loading dashboard…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.stats.map((stat) => (
          <VendorStatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5 shadow-sm">
          <h2 className="text-base font-bold text-foreground mb-4">
            Order Status
          </h2>
          <div className="flex flex-col gap-3">
            {(
              Object.keys(vendorOrderStatusStyles) as Array<
                keyof typeof vendorOrderStatusStyles
              >
            ).map((status) => {
              const count = orderCounts[status] ?? 0;
              const style = vendorOrderStatusStyles[status];
              return (
                <div
                  key={status}
                  className="flex items-center justify-between"
                >
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${style.className}`}
                  >
                    {style.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {count} orders
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <h2 className="text-base font-bold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-2">
            <a
              href="/vendor/products"
              className="text-sm text-center bg-navy-light hover:bg-navy text-white py-2.5 rounded-lg font-medium transition-colors"
            >
              Manage Products
            </a>
            <a
              href="/vendor/orders"
              className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
            >
              View Orders
            </a>
            <a
              href="/vendor/track-order"
              className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
            >
              Track Order
            </a>
            <a
              href="/vendor/earnings"
              className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
            >
              View Earnings
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            {data.pendingCount} orders in progress
            {data.lowStockCount > 0 && ` · ${data.lowStockCount} low stock items`}
          </p>
        </div>
      </div>

      <VendorOrdersPanel showViewAll />
    </div>
  );
}
