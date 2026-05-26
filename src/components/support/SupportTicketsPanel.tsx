"use client";

import { useEffect, useState } from "react";
import { TicketsTable } from "@/components/support/TicketsTable";
import type { SupportTicket } from "@/data/support";

export function SupportTicketsPanel({
  showViewAll = false,
}: {
  showViewAll?: boolean;
}) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/support/tickets");
        const data = (await res.json()) as {
          tickets?: SupportTicket[];
          error?: string;
        };

        if (!res.ok) {
          if (!cancelled) {
            setError(data.error ?? "Failed to load tickets.");
          }
          return;
        }

        if (!cancelled) {
          setTickets(data.tickets ?? []);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load tickets. Is the backend running?");
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
        Loading tickets…
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

  return <TicketsTable tickets={tickets} showViewAll={showViewAll} />;
}
