-- AlterTable
ALTER TABLE "Product" ADD COLUMN "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Backfill from existing cover image
UPDATE "Product"
SET "images" = ARRAY["image"]
WHERE cardinality("images") = 0 AND "image" <> '';
