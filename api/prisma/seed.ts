import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  // categories
  await prisma.category.createMany({
    data: [
      { title: "Hardware", slug: "hardware" },
      { title: "Databases", slug: "databases" }
    ]
  })

  // products
  await prisma.product.create({
    data: {
      name: "PiKVM", slug: "pi-kvm",
      shortDescription: "PiKVM short description",
      description: "PiKVM full description",
      productType: "Physical",
      prices: [{ amount: 199.99, currency: "USD" }],
      categories: {
        connect: [{ id: 1 }]
      }
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