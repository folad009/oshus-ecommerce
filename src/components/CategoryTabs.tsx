"use client";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => onCategoryChange(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === null
                ? "bg-navy text-white border-navy"
                : "bg-white text-navy border-border hover:border-navy"
            }`}
          >
            All
          </button>
          {categories.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() =>
                onCategoryChange(activeCategory === tab ? null : tab)
              }
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === tab
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
