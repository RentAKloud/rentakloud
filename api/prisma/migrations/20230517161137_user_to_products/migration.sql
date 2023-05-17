/*
  Warnings:

  - You are about to drop the column `model` on the `Profile` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserProductStatus" AS ENUM ('Active', 'Inactive');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "model",
ADD COLUMN     "gender" "Gender";

-- CreateTable
CREATE TABLE "UserToProducts" (
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "status" "UserProductStatus" NOT NULL DEFAULT 'Inactive',
    "subscriptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "UserToProducts_subscriptionId_key" ON "UserToProducts"("subscriptionId");

-- CreateIndex
CREATE INDEX "UserToProducts_userId_productId_idx" ON "UserToProducts"("userId", "productId");

-- AddForeignKey
ALTER TABLE "UserToProducts" ADD CONSTRAINT "UserToProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToProducts" ADD CONSTRAINT "UserToProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
