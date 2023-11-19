-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "taxes" JSONB NOT NULL DEFAULT '[]';

-- CreateTable
CREATE TABLE "TaxRate" (
    "id" SERIAL NOT NULL,
    "countryCode" CHAR(2),
    "stateCode" CHAR(2),
    "zip" TEXT,
    "city" TEXT,
    "rate" DECIMAL(10,6) NOT NULL,
    "name" TEXT NOT NULL,
    "compound" BOOLEAN NOT NULL DEFAULT false,
    "shipping" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "productTypes" "ProductType"[],

    CONSTRAINT "TaxRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToTaxRate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToTaxRate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTaxRate_AB_unique" ON "_ProductToTaxRate"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTaxRate_B_index" ON "_ProductToTaxRate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToTaxRate_AB_unique" ON "_CategoryToTaxRate"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToTaxRate_B_index" ON "_CategoryToTaxRate"("B");

-- AddForeignKey
ALTER TABLE "_ProductToTaxRate" ADD CONSTRAINT "_ProductToTaxRate_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTaxRate" ADD CONSTRAINT "_ProductToTaxRate_B_fkey" FOREIGN KEY ("B") REFERENCES "TaxRate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTaxRate" ADD CONSTRAINT "_CategoryToTaxRate_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTaxRate" ADD CONSTRAINT "_CategoryToTaxRate_B_fkey" FOREIGN KEY ("B") REFERENCES "TaxRate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
