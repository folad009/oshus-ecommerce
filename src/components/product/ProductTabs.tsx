"use client";

import { useState } from "react";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductDetail } from "@/types";

const tabs = ["Description", "Additional Information", "Review"] as const;
type Tab = (typeof tabs)[number];

interface ProductTabsProps {
  product: ProductDetail;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Description");

  return (
    <div className="mt-12 md:mt-16">
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
              activeTab === tab
                ? "text-forest border-forest"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-8">
        {activeTab === "Description" && (
          <div className="flex flex-col gap-4 max-w-3xl">
            {product.description.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
            <ul className="flex flex-col gap-3 mt-2">
              {product.descriptionBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Leaf className="size-4 text-forest shrink-0 mt-0.5" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "Additional Information" && (
          <div className="max-w-md flex flex-col gap-3">
            {product.additionalInfo.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0"
              >
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-medium text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Review" && (
          <p className="text-sm text-muted-foreground">
            {product.reviewCount} customer reviews. Average rating:{" "}
            <span className="font-semibold text-foreground">
              {product.rating} / 5
            </span>
            .
          </p>
        )}
      </div>
    </div>
  );
}
