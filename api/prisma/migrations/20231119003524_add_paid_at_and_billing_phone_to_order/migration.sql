/*
  Warnings:

  - Added the required column `billingPhone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "billingPhone" TEXT NOT NULL,
ADD COLUMN     "paidAt" TIMESTAMP(3);
