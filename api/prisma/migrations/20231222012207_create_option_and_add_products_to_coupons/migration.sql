/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `CouponCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CouponCode" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "CouponCodeToOrder" ADD COLUMN     "products" INTEGER[];

-- CreateTable
CREATE TABLE "Option" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "_CouponCodeToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Option_key_key" ON "Option"("key");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponCodeToProduct_AB_unique" ON "_CouponCodeToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponCodeToProduct_B_index" ON "_CouponCodeToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "CouponCode_code_key" ON "CouponCode"("code");

-- AddForeignKey
ALTER TABLE "_CouponCodeToProduct" ADD CONSTRAINT "_CouponCodeToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "CouponCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponCodeToProduct" ADD CONSTRAINT "_CouponCodeToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
