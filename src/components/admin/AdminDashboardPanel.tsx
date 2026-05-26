"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { AdminOrdersPanel } from "@/components/admin/AdminOrdersPanel";
import { statusStyles, type AdminStat } from "@/data/admin";

interface DashboardResponse {
  stats: AdminStat[];
  pendingCount: number;
  orderCounts: Record<string, number>;
}

export function AdminDashboardPanel() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/dashboard");
        const json = (await res.json()) as DashboardResponse & { error?: string };

        if (!res.ok) {
          if (!cancelled) {
            setError(json.error ?? "Failed to load dashboard.");
          }
          return;
        }

        if (!cancelled) {
          setData(json);
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
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5 shadow-sm">
          <h2 className="text-base font-bold text-foreground mb-4">
            Order Status Overview
          </h2>
          <div className="flex flex-col gap-3">
            {(
              Object.keys(statusStyles) as Array<keyof typeof statusStyles>
            ).map((status) => {
              const count = data.orderCounts[status] ?? 0;
              const style = statusStyles[status];
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
              href="/admin/products"
              className="text-sm text-center bg-forest hover:bg-forest-dark text-white py-2.5 rounded-lg font-medium transition-colors"
            >
              Manage Products
            </a>
            <a
              href="/admin/orders"
              className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
            >
              View Orders
            </a>
            <a
              href="/admin/track-order"
              className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
            >
              Track Order
            </a>
            <a
              href="/"
              className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
            >
              View Storefront
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            {data.pendingCount} orders need attention
          </p>
        </div>
      </div>

      <AdminOrdersPanel showViewAll />
    </div>
  );
}
