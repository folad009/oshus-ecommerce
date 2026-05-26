"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { statusStyles, type OrderStatus } from "@/data/admin";

interface StatusUpdateBarProps {
  currentStatus: OrderStatus;
  orderSlug: string;
  statusApiPath?: string;
}

const statusOptions = Object.keys(statusStyles) as OrderStatus[];

export function StatusUpdateBar({
  currentStatus,
  orderSlug,
  statusApiPath = "/api/admin/orders",
}: StatusUpdateBarProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`${statusApiPath}/${orderSlug}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to update status.");
        return;
      }

      router.refresh();
    } catch {
      setError("Failed to update status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-navy rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="text-white font-semibold text-sm">Update order status</p>
        <p className="text-white/60 text-xs mt-0.5">
          Changes are logged in the activity trail
        </p>
        {error && (
          <p className="text-coral text-xs mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
          className="h-10 rounded-lg border border-white/20 bg-white/10 text-white text-sm px-3 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-coral/50"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt} className="text-foreground">
              {statusStyles[opt].label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving}
          className="bg-coral hover:bg-coral-dark text-white text-sm font-semibold h-10 px-5 rounded-lg transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Status"}
        </button>
      </div>
    </div>
  );
}
