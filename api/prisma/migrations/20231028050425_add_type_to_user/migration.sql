-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Admin', 'User', 'Staff');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'User';
