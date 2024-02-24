-- AlterTable
ALTER TABLE "UserToProducts" ADD COLUMN     "meta" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "vncPath" TEXT NOT NULL DEFAULT '';
