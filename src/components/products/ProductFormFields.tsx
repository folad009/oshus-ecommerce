"use client";

import { Input } from "@/components/ui/input";
import type { ShopCategory } from "@/data/shop-categories";
import type { ProductFormData } from "@/lib/product-form";
import { ProductImageUpload } from "@/components/products/ProductImageUpload";
import { ProductVariantEditor } from "@/components/products/ProductVariantEditor";
import type { ProductVariantOption } from "@/lib/product-variants";

const textareaClassName =
  "flex min-h-[88px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-y";

type ProductFormTextField = Exclude<
  keyof ProductFormData,
  "images" | "variants"
>;

interface ProductFormFieldsProps {
  form: ProductFormData;
  onChange: (field: ProductFormTextField, value: string) => void;
  onImagesChange: (images: string[]) => void;
  onVariantsChange: (variants: ProductVariantOption[]) => void;
  showVendorEmail?: boolean;
  categories: ShopCategory[];
  disabled?: boolean;
}

export function ProductFormFields({
  form,
  onChange,
  onImagesChange,
  onVariantsChange,
  showVendorEmail,
  categories,
  disabled,
}: ProductFormFieldsProps) {
  return (
    <>
      <div className="md:col-span-2">
        <p className="text-sm font-semibold text-foreground mb-3">Basic info</p>
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Product name <span className="text-coral">*</span>
        </label>
        <Input
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
          placeholder="HydraGlow Serum"
          className="h-11 rounded-lg"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Category <span className="text-coral">*</span>
        </label>
        <select
          value={form.category}
          onChange={(e) => onChange("category", e.target.value)}
          required
          disabled={disabled}
          className="flex h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50"
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          SKU
        </label>
        <Input
          value={form.sku}
          onChange={(e) => onChange("sku", e.target.value)}
          placeholder="GRFR85648HGJ"
          className="h-11 rounded-lg"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Stock <span className="text-coral">*</span>
        </label>
        <Input
          type="number"
          min={0}
          value={form.stock}
          onChange={(e) => onChange("stock", e.target.value)}
          required={form.variants.length === 0}
          className="h-11 rounded-lg"
          disabled={disabled || form.variants.length > 0}
        />
        {form.variants.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Synced from variant stocks
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Price (₦) <span className="text-coral">*</span>
        </label>
        <Input
          type="number"
          min={1}
          value={form.price}
          onChange={(e) => onChange("price", e.target.value)}
          required={form.variants.length === 0}
          placeholder="35000"
          className="h-11 rounded-lg"
          disabled={disabled || form.variants.length > 0}
        />
        {form.variants.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Listing price uses the cheapest variant
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Original price (₦)
        </label>
        <Input
          type="number"
          min={1}
          value={form.originalPrice}
          onChange={(e) => onChange("originalPrice", e.target.value)}
          placeholder="Optional for discount"
          className="h-11 rounded-lg"
          disabled={disabled || form.variants.length > 0}
        />
      </div>

      <ProductVariantEditor
        variants={form.variants}
        onChange={onVariantsChange}
        disabled={disabled}
      />

      {showVendorEmail && (
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Vendor email
          </label>
          <Input
            type="email"
            value={form.vendorEmail}
            onChange={(e) => onChange("vendorEmail", e.target.value)}
            placeholder="chioma@glowbeauty.ng (optional)"
            className="h-11 rounded-lg"
            disabled={disabled}
          />
        </div>
      )}

      <ProductImageUpload
        images={form.images}
        onChange={onImagesChange}
        disabled={disabled}
      />

      <div className="md:col-span-2 pt-2 border-t border-border">
        <p className="text-sm font-semibold text-foreground mb-3 mt-1">
          Product details
        </p>
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Short description
        </label>
        <textarea
          value={form.shortDescription}
          onChange={(e) => onChange("shortDescription", e.target.value)}
          placeholder="A brief summary shown on the product page."
          className={textareaClassName}
          rows={3}
          disabled={disabled}
        />
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Full description
        </label>
        <textarea
          value={form.descriptionText}
          onChange={(e) => onChange("descriptionText", e.target.value)}
          placeholder="Write paragraphs separated by a blank line."
          className={textareaClassName}
          rows={5}
          disabled={disabled}
        />
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Key features
        </label>
        <textarea
          value={form.descriptionBulletsText}
          onChange={(e) => onChange("descriptionBulletsText", e.target.value)}
          placeholder="One feature per line"
          className={textareaClassName}
          rows={4}
          disabled={disabled}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Tags
        </label>
        <Input
          value={form.tagsText}
          onChange={(e) => onChange("tagsText", e.target.value)}
          placeholder="Skincare, Serums, Vitamin C"
          className="h-11 rounded-lg"
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-1">Comma-separated</p>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Simple sizes (optional)
        </label>
        <Input
          value={form.sizesText}
          onChange={(e) => onChange("sizesText", e.target.value)}
          placeholder="30 ml, 60 ml, 100 ml"
          className="h-11 rounded-lg"
          disabled={disabled || form.variants.length > 0}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {form.variants.length > 0
            ? "Ignored when pack option variants are set"
            : "Comma-separated labels only (no separate prices)"}
        </p>
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Additional information
        </label>
        <textarea
          value={form.additionalInfoText}
          onChange={(e) => onChange("additionalInfoText", e.target.value)}
          placeholder={"Weight: 30 ml\nIngredients: Vitamin C, Hyaluronic Acid\nCountry of Origin: Nigeria"}
          className={textareaClassName}
          rows={4}
          disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-1">
          One row per line, format: Label: Value
        </p>
      </div>
    </>
  );
}
