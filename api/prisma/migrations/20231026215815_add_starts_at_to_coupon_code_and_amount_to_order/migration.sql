/*
  Warnings:

  - You are about to alter the column `flatDiscount` on the `CouponCode` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "CouponCode" ADD COLUMN     "startsAt" TIMESTAMP(3),
ALTER COLUMN "flatDiscount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount" DECIMAL(10,2);
