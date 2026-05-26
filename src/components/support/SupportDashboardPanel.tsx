"use client";

import { useEffect, useState } from "react";
import { SupportStatCard } from "@/components/support/SupportStatCard";
import { SupportTicketsPanel } from "@/components/support/SupportTicketsPanel";
import { ticketStatusStyles, type SupportStat } from "@/data/support";

interface DashboardResponse {
  stats: SupportStat[];
  openCount: number;
  highPriorityCount: number;
  ticketCounts: Record<string, number>;
}

export function SupportDashboardPanel() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/support/dashboard");
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
          <SupportStatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5 shadow-sm">
          <h2 className="text-base font-bold text-foreground mb-4">
            Ticket Status Overview
          </h2>
          <div className="flex flex-col gap-3">
            {(
              Object.keys(ticketStatusStyles) as Array<
                keyof typeof ticketStatusStyles
              >
            ).map((status) => {
              const count = data.ticketCounts[status] ?? 0;
              const style = ticketStatusStyles[status];
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
                    {count} tickets
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
              href="/support/tickets"
              className="text-sm text-center bg-forest hover:bg-forest-dark text-white py-2.5 rounded-lg font-medium transition-colors"
            >
              View Tickets
            </a>
            <a
              href="/support/orders"
              className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
            >
              Lookup Orders
            </a>
            <a
              href="/support/track-order"
              className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
            >
              Track Order
            </a>
            <a
              href="/support/inbox"
              className="text-sm text-center border border-border hover:bg-light-gray py-2.5 rounded-lg font-medium transition-colors"
            >
              Open Inbox
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            {data.openCount} tickets need attention · {data.highPriorityCount}{" "}
            high priority
          </p>
        </div>
      </div>

      <SupportTicketsPanel showViewAll />
    </div>
  );
}
