-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "descriptionEditor" JSONB,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 1;
