-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Admin', 'User', 'Staff');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('Created', 'Sent', 'Notified', 'Read', 'Failed');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('Incomplete', 'IncompleteExpired', 'Trialing', 'Active', 'PastDue', 'Canceled', 'Unpaid', 'Paused');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS', 'NOT_SPECIFIED');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('OnlineService', 'Physical');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Paid', 'Shipped', 'Completed', 'OnHold', 'Cancelled');

-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('Flat', 'Percentage');

-- CreateEnum
CREATE TYPE "InstanceStatus" AS ENUM ('Pending', 'Active', 'Inactive');

-- CreateEnum
CREATE TYPE "DiskImageFormat" AS ENUM ('QCOW2', 'VHDX', 'DMG', 'ISO', 'VDI', 'IMG');

-- CreateEnum
CREATE TYPE "DiskImageOS" AS ENUM ('Linux', 'Windows', 'macOS');

-- CreateEnum
CREATE TYPE "ShippingMethodType" AS ENUM ('Free', 'Flat', 'Local');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "emailVerifiedAt" TIMESTAMP(3),
    "type" "UserType" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" INTEGER NOT NULL,
    "gender" "Gender",
    "birthDate" TIMESTAMP(3),
    "companyName" TEXT,
    "companyPosition" TEXT,
    "preferredTheme" TEXT NOT NULL DEFAULT 'system',
    "stripeCustomerId" TEXT,
    "meta" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "profileUserId" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "address" TEXT NOT NULL,
    "address2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "zip" TEXT,
    "country" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'Created',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "descriptionEditor" JSONB,
    "contentAfterPrice" TEXT,
    "productType" "ProductType" NOT NULL DEFAULT 'OnlineService',
    "prices" JSONB[],
    "stock" INTEGER NOT NULL DEFAULT 1,
    "images" JSONB NOT NULL DEFAULT '[]',
    "stripeId" TEXT,
    "weight" DECIMAL(12,6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" JSONB DEFAULT '{}',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Instance" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "configId" INTEGER NOT NULL,
    "status" "InstanceStatus" NOT NULL DEFAULT 'Inactive',
    "subscriptionId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "addons" JSONB NOT NULL DEFAULT '[]',
    "meta" JSONB NOT NULL DEFAULT '{}',
    "vncPath" TEXT NOT NULL DEFAULT '',
    "privateIp" TEXT NOT NULL DEFAULT '',
    "publicIp" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Instance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "priceId" TEXT NOT NULL,
    "externalId" TEXT,
    "status" "SubscriptionStatus" NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "trialStart" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "billingFirstName" TEXT NOT NULL,
    "billingLastName" TEXT NOT NULL,
    "billingEmail" TEXT NOT NULL,
    "billingPhone" TEXT NOT NULL DEFAULT '',
    "billingAddress" TEXT NOT NULL,
    "billingAddress2" TEXT,
    "billingCity" TEXT NOT NULL,
    "billingState" TEXT NOT NULL,
    "billingZip" TEXT NOT NULL,
    "billingCountry" TEXT NOT NULL,
    "shippingFirstName" TEXT NOT NULL,
    "shippingLastName" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "shippingAddress2" TEXT,
    "shippingCity" TEXT NOT NULL,
    "shippingState" TEXT NOT NULL,
    "shippingZip" TEXT NOT NULL,
    "shippingCountry" TEXT NOT NULL,
    "items" JSONB[],
    "taxes" JSONB NOT NULL DEFAULT '[]',
    "shipping" JSONB NOT NULL DEFAULT '{}',
    "status" "OrderStatus" NOT NULL DEFAULT 'Pending',
    "notes" TEXT NOT NULL,
    "amount" DECIMAL(10,2),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouponCode" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "CouponType" NOT NULL DEFAULT 'Flat',
    "flatDiscount" DECIMAL(10,2) NOT NULL,
    "percentageDiscount" INTEGER NOT NULL,
    "maxUses" INTEGER,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CouponCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouponCodeToOrder" (
    "id" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "couponCodeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "CouponType" NOT NULL,
    "flatDiscount" DECIMAL(10,2) NOT NULL,
    "percentageDiscount" INTEGER NOT NULL,
    "products" INTEGER[],

    CONSTRAINT "CouponCodeToOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxRate" (
    "id" SERIAL NOT NULL,
    "countryCode" CHAR(2),
    "stateCode" CHAR(2),
    "zip" TEXT,
    "city" TEXT,
    "rate" DECIMAL(10,6) NOT NULL,
    "name" TEXT NOT NULL,
    "compound" BOOLEAN NOT NULL DEFAULT false,
    "shipping" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "productTypes" "ProductType"[],

    CONSTRAINT "TaxRate_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "ShippingZone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countries" TEXT[],
    "states" TEXT[],
    "cities" TEXT[],
    "zips" TEXT[],

    CONSTRAINT "ShippingZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ShippingMethodType" NOT NULL DEFAULT 'Flat',
    "cost" TEXT NOT NULL,
    "taxable" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 1,
    "shippingZoneId" INTEGER,

    CONSTRAINT "ShippingMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToTaxRate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToTaxRate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CouponCodeToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Address_profileUserId_address_address2_city_state_zip_count_key" ON "Address"("profileUserId", "address", "address2", "city", "state", "zip", "country");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_stripeId_key" ON "Product"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "Instance_subscriptionId_key" ON "Instance"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "CouponCode_code_key" ON "CouponCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Option_key_key" ON "Option"("key");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTaxRate_AB_unique" ON "_ProductToTaxRate"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTaxRate_B_index" ON "_ProductToTaxRate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToTaxRate_AB_unique" ON "_CategoryToTaxRate"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToTaxRate_B_index" ON "_CategoryToTaxRate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponCodeToProduct_AB_unique" ON "_CouponCodeToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponCodeToProduct_B_index" ON "_CouponCodeToProduct"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileUserId_fkey" FOREIGN KEY ("profileUserId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instance" ADD CONSTRAINT "Instance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instance" ADD CONSTRAINT "Instance_configId_fkey" FOREIGN KEY ("configId") REFERENCES "Config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instance" ADD CONSTRAINT "Instance_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponCodeToOrder" ADD CONSTRAINT "CouponCodeToOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouponCodeToOrder" ADD CONSTRAINT "CouponCodeToOrder_couponCodeId_fkey" FOREIGN KEY ("couponCodeId") REFERENCES "CouponCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiskImage" ADD CONSTRAINT "DiskImage_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingMethod" ADD CONSTRAINT "ShippingMethod_shippingZoneId_fkey" FOREIGN KEY ("shippingZoneId") REFERENCES "ShippingZone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTaxRate" ADD CONSTRAINT "_ProductToTaxRate_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTaxRate" ADD CONSTRAINT "_ProductToTaxRate_B_fkey" FOREIGN KEY ("B") REFERENCES "TaxRate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTaxRate" ADD CONSTRAINT "_CategoryToTaxRate_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTaxRate" ADD CONSTRAINT "_CategoryToTaxRate_B_fkey" FOREIGN KEY ("B") REFERENCES "TaxRate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponCodeToProduct" ADD CONSTRAINT "_CouponCodeToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "CouponCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponCodeToProduct" ADD CONSTRAINT "_CouponCodeToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
