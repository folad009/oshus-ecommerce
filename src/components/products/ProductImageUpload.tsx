"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_IMAGES = 4;
const ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

interface ProductImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  disabled?: boolean;
}

export function ProductImageUpload({
  images,
  onChange,
  disabled = false,
}: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(selected: FileList | null) {
    if (!selected?.length || disabled) {
      return;
    }

    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      setError(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const files = Array.from(selected).slice(0, remaining);
    setUploading(true);
    setError("");

    const uploaded: string[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/uploads/product-image", {
          method: "POST",
          body: formData,
        });

        const data = (await res.json()) as { error?: string; url?: string };

        if (!res.ok || !data.url) {
          throw new Error(data.error ?? "Upload failed.");
        }

        uploaded.push(data.url);
      }

      onChange([...images, ...uploaded]);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Could not upload image."
      );
      if (uploaded.length > 0) {
        onChange([...images, ...uploaded]);
      }
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="md:col-span-2">
      <label className="text-sm font-medium text-foreground mb-1.5 block">
        Product images <span className="text-coral">*</span>
        <span className="text-muted-foreground font-normal ml-1">
          (up to {MAX_IMAGES})
        </span>
      </label>

      <div className="flex flex-wrap gap-3 mb-3">
        {images.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative size-24 rounded-lg overflow-hidden border border-border bg-light-gray group"
          >
            <Image
              src={url}
              alt={`Product image ${index + 1}`}
              fill
              className="object-cover"
              sizes="96px"
            />
            {index === 0 && (
              <span className="absolute bottom-1 left-1 text-[10px] font-semibold bg-forest text-white px-1.5 py-0.5 rounded">
                Cover
              </span>
            )}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 size-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove image ${index + 1}`}
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        ))}

        {images.length < MAX_IMAGES && !disabled && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "size-24 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-forest hover:text-forest transition-colors",
              uploading && "pointer-events-none opacity-60"
            )}
          >
            {uploading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <ImagePlus className="size-5" />
            )}
            <span className="text-[10px] font-medium">
              {uploading ? "Uploading" : "Add image"}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => void handleFiles(e.target.files)}
      />

      {images.length === 0 && (
        <Button
          type="button"
          variant="outline"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
          className="h-10 rounded-lg text-sm"
        >
          {uploading ? "Uploading..." : "Upload images"}
        </Button>
      )}

      {error && (
        <p className="text-sm text-coral mt-2" role="alert">
          {error}
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-2">
        JPEG, PNG, WebP, or GIF. Max 5 MB each. First image is the cover photo.
      </p>
    </div>
  );
}
