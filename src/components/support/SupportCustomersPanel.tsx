"use client";

import { useEffect, useState } from "react";
import { CustomersTable } from "@/components/support/CustomersTable";
import type { SupportCustomer } from "@/data/support";

export function SupportCustomersPanel() {
  const [customers, setCustomers] = useState<SupportCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/support/customers");
        const data = (await res.json()) as {
          customers?: SupportCustomer[];
          error?: string;
        };

        if (!res.ok) {
          if (!cancelled) {
            setError(data.error ?? "Failed to load customers.");
          }
          return;
        }

        if (!cancelled) {
          setCustomers(data.customers ?? []);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load customers. Is the backend running?");
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
        Loading customers…
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

  return <CustomersTable customers={customers} />;
}
