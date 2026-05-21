"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
interface OrderSearchPanelProps {
  basePath?: string;
}

export function OrderSearchPanel({ basePath = "/admin" }: OrderSearchPanelProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim().replace(/^#/, "");
    if (trimmed) {
      router.push(`${basePath}/track-order/${trimmed}`);
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-xl border border-border p-5 shadow-sm"
    >
      <h2 className="text-base font-bold text-foreground mb-1">
        Track an Order
      </h2>
      <p className="text-xs text-muted-foreground mb-4">
        Enter an order ID (e.g. SDGT1254FD or #SDGT1254FD)
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Order ID"
          className="h-11 rounded-lg flex-1"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white h-11 px-6 rounded-lg text-sm font-semibold transition-colors shrink-0"
        >
          <Search className="size-4" />
          Track Order
        </button>
      </div>
    </form>
  );
}
