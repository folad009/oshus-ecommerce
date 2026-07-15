"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  emptyVariantRow,
  type ProductVariantOption,
} from "@/lib/product-variants";

interface ProductVariantEditorProps {
  variants: ProductVariantOption[];
  onChange: (variants: ProductVariantOption[]) => void;
  disabled?: boolean;
}

export function ProductVariantEditor({
  variants,
  onChange,
  disabled,
}: ProductVariantEditorProps) {
  function updateRow(
    index: number,
    field: keyof ProductVariantOption,
    value: string
  ) {
    onChange(
      variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      )
    );
  }

  function addRow() {
    onChange([...variants, emptyVariantRow()]);
  }

  function removeRow(index: number) {
    onChange(variants.filter((_, i) => i !== index));
  }

  return (
    <div className="md:col-span-2 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Pack options (variants)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Add Weight, Pack size, and Flavour combinations. Each row is a
            sellable SKU with its own price and stock.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={addRow}
          className="rounded-lg h-9 text-sm shrink-0"
        >
          <Plus className="size-4 mr-1.5" />
          Add option
        </Button>
      </div>

      {variants.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
          No variants yet. Products without variants use the single price and
          stock above. For snacks, add rows like{" "}
          <span className="text-foreground">36 g / 48 / Spring Onion</span>.
        </div>
      ) : (
        <div className="space-y-3">
          {variants.map((variant, index) => (
            <div
              key={variant.id ?? `new-${index}`}
              className="rounded-lg border border-border p-3 md:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Weight / Quantity
                </label>
                <Input
                  value={variant.weight}
                  onChange={(e) => updateRow(index, "weight", e.target.value)}
                  placeholder="36 g"
                  className="h-10 rounded-lg"
                  disabled={disabled}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Pack of
                </label>
                <Input
                  value={variant.packSize}
                  onChange={(e) => updateRow(index, "packSize", e.target.value)}
                  placeholder="48"
                  className="h-10 rounded-lg"
                  disabled={disabled}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Flavour
                </label>
                <Input
                  value={variant.flavour}
                  onChange={(e) => updateRow(index, "flavour", e.target.value)}
                  placeholder="Spring Onion & Cheese"
                  className="h-10 rounded-lg"
                  disabled={disabled}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Price (₦)
                </label>
                <Input
                  type="number"
                  min={1}
                  value={variant.price}
                  onChange={(e) => updateRow(index, "price", e.target.value)}
                  placeholder="35995"
                  className="h-10 rounded-lg"
                  disabled={disabled}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Original price (₦)
                </label>
                <Input
                  type="number"
                  min={1}
                  value={variant.originalPrice}
                  onChange={(e) =>
                    updateRow(index, "originalPrice", e.target.value)
                  }
                  placeholder="Optional"
                  className="h-10 rounded-lg"
                  disabled={disabled}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Stock
                </label>
                <Input
                  type="number"
                  min={0}
                  value={variant.stock}
                  onChange={(e) => updateRow(index, "stock", e.target.value)}
                  className="h-10 rounded-lg"
                  disabled={disabled}
                  required
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  SKU
                </label>
                <Input
                  value={variant.sku}
                  onChange={(e) => updateRow(index, "sku", e.target.value)}
                  placeholder="LAY-36-48-SOC"
                  className="h-10 rounded-lg"
                  disabled={disabled}
                />
              </div>
              <div className="flex items-end justify-end">
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  onClick={() => removeRow(index)}
                  className="rounded-lg h-10 text-sm text-coral border-coral/30 hover:bg-coral/5"
                >
                  <Trash2 className="size-4 mr-1.5" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
