-- AlterTable
ALTER TABLE "Instance" ADD COLUMN     "hostIp" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "hostName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "wsPort" INTEGER NOT NULL DEFAULT -1;
