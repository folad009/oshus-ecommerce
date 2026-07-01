-- CreateEnum
CREATE TYPE "StoreCurrency" AS ENUM ('NGN', 'ZAR');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "currency" "StoreCurrency" NOT NULL DEFAULT 'NGN';
