/*
  Warnings:

  - A unique constraint covering the columns `[vmId]` on the table `Instance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Instance" ADD COLUMN     "vmId" SERIAL NOT NULL;

SELECT setval(pg_get_serial_sequence('"Instance"','vmId'), 3000, false) FROM "Instance";

-- CreateIndex
CREATE UNIQUE INDEX "Instance_vmId_key" ON "Instance"("vmId");

-- ALTER SEQUENCE Instance_vmId_seq RESTART WITH 3000;
