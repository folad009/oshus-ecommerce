"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_NUMBERS = [1, 2, 3, "...", 10] as const;

export function ShopPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <nav
      className="flex items-center justify-center gap-1.5 mt-10"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="size-9 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-forest hover:text-forest disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </button>

      {PAGE_NUMBERS.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="size-9 flex items-center justify-center text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => setCurrentPage(page)}
            className={cn(
              "size-9 rounded-full text-sm font-medium flex items-center justify-center transition-colors",
              currentPage === page
                ? "bg-forest text-white"
                : "text-foreground/70 hover:text-forest hover:bg-light-gray"
            )}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
        disabled={currentPage === 10}
        className="size-9 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:border-forest hover:text-forest disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
