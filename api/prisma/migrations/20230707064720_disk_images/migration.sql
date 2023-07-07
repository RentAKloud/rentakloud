-- CreateEnum
CREATE TYPE "DiskImageFormat" AS ENUM ('QCOW2', 'VHDX', 'DMG', 'ISO', 'VDI', 'IMG');

-- CreateEnum
CREATE TYPE "DiskImageOS" AS ENUM ('Linux', 'Windows', 'macOS');

-- AlterTable
ALTER TABLE "UserToProducts" ALTER COLUMN "id" DROP DEFAULT;

-- CreateTable
CREATE TABLE "DiskImage" (
    "id" SERIAL NOT NULL,
    "createdById" INTEGER,
    "name" TEXT NOT NULL,
    "format" "DiskImageFormat" NOT NULL,
    "description" TEXT,
    "tags" TEXT[],
    "path" TEXT NOT NULL,
    "os" "DiskImageOS" NOT NULL,
    "osName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiskImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiskImage" ADD CONSTRAINT "DiskImage_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
