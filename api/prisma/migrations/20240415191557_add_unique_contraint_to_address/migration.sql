/*
  Warnings:

  - A unique constraint covering the columns `[profileUserId,address,address2,city,state,zip,country]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Made the column `profileUserId` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_profileUserId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "profileUserId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_profileUserId_address_address2_city_state_zip_count_key" ON "Address"("profileUserId", "address", "address2", "city", "state", "zip", "country");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
