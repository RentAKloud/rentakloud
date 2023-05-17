import { Prisma, ProductType } from "@prisma/client"

export const products: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>[] = [
  {
    name: "PiKVM", slug: "pi-kvm",
    shortDescription: "PiKVM short description",
    description: "PiKVM full description",
    productType: ProductType.Physical,
    prices: [{ amount: 199.99, currency: "USD" }],
    categories: {
      connect: [{ id: 1 }]
    }
  },
  {
    name: "PostgresQL", slug: "postgresql",
    shortDescription: "PostgresQL short description",
    description: "PostgresQL full description",
    productType: ProductType.OnlineService,
    prices: [
      {
        amount: 5.99,
        priceId: "1",
        currency: "USD",
        interval: "month",
        planName: "Basic Plan",
        intervalCount: 1
      },
      {
        amount: 13.99,
        priceId: "2",
        currency: "USD",
        interval: "month",
        planName: "Pro Plan",
        intervalCount: 1
      },
      {
        amount: 23.99,
        priceId: "3",
        currency: "USD",
        interval: "month",
        planName: "Premium Plan",
        intervalCount: 1
      }
    ],
    categories: {
      connect: [{ id: 2 }]
    }
  }
]