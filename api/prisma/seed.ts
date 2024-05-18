import { PrismaClient } from "@prisma/client";
import { products } from "./seed.data";

const prisma = new PrismaClient()

async function main() {
  // users
  await prisma.user.create({
    data: {
      firstName: "Test", lastName: "Acc",
      email: "test.acc@yopmail.com", password: "$2b$14$kTqWqctH2sPCfnsTzugkOu3HDZ92zC4SAMtAhrea21fLpJn0tMf9i", // Password
      profile: { create: {} }
    }
  })

  // categories
  await prisma.category.createMany({
    data: [
      { title: "Hardware", slug: "hardware" },
      { title: "Servers", slug: "servers", parentId: 1 },
      { title: "Routers", slug: "routers", parentId: 1 },
      { title: "Cloud Products", slug: "cloud-products" },
      { title: "Databases", slug: "databases", parentId: 4 },
      { title: "CMS", slug: "cms", parentId: 4 },
      { title: "Message Queueing", slug: "message-queueing", parentId: 4 },
      { title: "ERP", slug: "erp", parentId: 4 },
      { title: "CRM", slug: "crm", parentId: 4 },
      { title: "Runtimes", slug: "runtimes", parentId: 4 },
      { title: "Ecommerce", slug: "ecommerce", parentId: 4 },
      { title: "EMR", slug: "emr", parentId: 4 },
    ]
  })

  // products
  products.forEach(async (product) => {
    await prisma.product.create({
      data: product
    })
  })

  await prisma.shippingZone.createMany({
    data: [
      { name: "United States", countries: ['US'] },
      { name: "Other Regions" }
    ]
  })

  await prisma.shippingMethod.createMany({
    data: [
      {
        name: "Standard", description: "Delivered in 3-7 days once your order has been shipped.",
        cost: `if (w <= 5) 50
          else if (w <= 10) 100
          else 200`,
        shippingZoneId: 1
      },
      {
        name: "Express", description: "Delivered in 1-3 days once your order has been shipped.",
        cost: `if (w <= 5) 110
          else if (w <= 10) 170
          else 300`,
        shippingZoneId: 1
      }
    ]
  })

  await prisma.taxRate.create({
    data: {
      countryCode: 'US',
      stateCode: 'TX',
      rate: 0.008250,
      name: "Sales Tax"
    }
  })

  await prisma.option.create({
    data: {
      key: 'app-settings',
      value: { isStripeTestMode: true, disableCheckout: false }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })