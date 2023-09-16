-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropTable
DROP TABLE "Notification";

-- DropEnum
DROP TYPE "NotificationStatus";

