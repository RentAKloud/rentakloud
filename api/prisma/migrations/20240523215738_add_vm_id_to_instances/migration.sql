/*
  Warnings:

  - A unique constraint covering the columns `[vmId]` on the table `Instance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Instance" ADD COLUMN     "vmId" SERIAL NOT NULL;

ALTER SEQUENCE "Instance_vmId_seq" RESTART WITH 3000;

-- CreateIndex
CREATE UNIQUE INDEX "Instance_vmId_key" ON "Instance"("vmId");

-- ALTER SEQUENCE Instance_vmId_seq RESTART WITH 3000;
