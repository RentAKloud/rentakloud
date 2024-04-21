/*
  Warnings:

  - Added the required column `configId` to the `UserToProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserToProducts" ADD COLUMN     "configId" INTEGER NOT NULL,
ADD COLUMN     "privateIp" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "publicIp" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpus" INTEGER NOT NULL,
    "ram" DOUBLE PRECISION NOT NULL,
    "ssd" DOUBLE PRECISION NOT NULL,
    "hdd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserToProducts" ADD CONSTRAINT "UserToProducts_configId_fkey" FOREIGN KEY ("configId") REFERENCES "Config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
