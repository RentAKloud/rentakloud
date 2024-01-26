-- AlterEnum
ALTER TYPE "UserProductStatus" ADD VALUE 'Pending';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "meta" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "UserToProducts" ADD COLUMN     "addons" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
