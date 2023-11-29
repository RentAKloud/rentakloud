/*
  Warnings:

  - You are about to drop the `_CouponCodeToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CouponCodeToOrder" DROP CONSTRAINT "_CouponCodeToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_CouponCodeToOrder" DROP CONSTRAINT "_CouponCodeToOrder_B_fkey";

-- DropTable
DROP TABLE "_CouponCodeToOrder";

-- CreateTable
CREATE TABLE "CouponCodeToOrder" (
    "id" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "couponCodeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "CouponType" NOT NULL,
    "flatDiscount" DECIMAL(10,2) NOT NULL,
    "percentageDiscount" INTEGER NOT NULL,

    CONSTRAINT "CouponCodeToOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CouponCodeToOrder" ADD CONSTRAINT "CouponCodeToOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponCodeToOrder" ADD CONSTRAINT "CouponCodeToOrder_couponCodeId_fkey" FOREIGN KEY ("couponCodeId") REFERENCES "CouponCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
