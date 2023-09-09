import { PrismaClient } from "@prisma/client";
import { products } from "./seed.data";

const prisma = new PrismaClient()

async function main() {
  // categories
  await prisma.category.createMany({
    data: [
      { title: "Hardware", slug: "hardware" },
      { title: "Databases", slug: "databases" },
      { title: "CMS", slug: "cms" },
      { title: "Message Queueing", slug: "message-queueing" },
      { title: "ERP", slug: "erp" },
      { title: "CRM", slug: "crm" },
      { title: "Runtimes", slug: "runtimes" },
      { title: "Ecommerce", slug: "ecommerce" },
      { title: "EMR", slug: "emr" },
      { title: "Servers", slug: "servers" },
      { title: "Routers", slug: "routers" },
    ]
  })

  // products
  products.forEach(async (product) => {
    await prisma.product.create({
      data: product
    })
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