-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- Seed default categories
INSERT INTO "Category" ("id", "name", "createdAt", "updatedAt") VALUES
  ('seed-cat-skin-care', 'Skin Care', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-cat-makeup', 'Makeup', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-cat-hair-care', 'Hair Care', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-cat-fragrances', 'Fragrances', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-cat-nail-care', 'Nail Care', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('seed-cat-body-care', 'Body Care', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("name") DO NOTHING;
