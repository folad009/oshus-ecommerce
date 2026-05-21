"use client";

import { useState } from "react";
import { categoryTabs } from "@/data/categories";

export function CategoryTabs() {
  const [active, setActive] = useState<string>(categoryTabs[0]);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === tab
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-border hover:border-navy"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
