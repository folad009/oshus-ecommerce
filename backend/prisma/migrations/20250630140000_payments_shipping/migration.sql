-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
ALTER TABLE "Order" ADD COLUMN "paymentReference" TEXT;
ALTER TABLE "Order" ADD COLUMN "paidAt" TIMESTAMP(3);
ALTER TABLE "Order" ADD COLUMN "shippingFee" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Order" ADD COLUMN "deliveryCity" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Order" ADD COLUMN "deliveryLatitude" DOUBLE PRECISION;
ALTER TABLE "Order" ADD COLUMN "deliveryLongitude" DOUBLE PRECISION;
ALTER TABLE "Order" ADD COLUMN "kwikTrackingUrl" TEXT;
ALTER TABLE "Order" ALTER COLUMN "carrier" SET DEFAULT 'Kwik';

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentReference_key" ON "Order"("paymentReference");
CREATE INDEX "Order_paymentReference_idx" ON "Order"("paymentReference");
