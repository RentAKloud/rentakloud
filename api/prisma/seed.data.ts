import { Prisma, ProductType } from "@prisma/client"

export const products: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>[] = [
  {
    name: "PiKVM", slug: "pi-kvm",
    shortDescription: "PiKVM short description",
    description: "PiKVM full description",
    productType: ProductType.Physical,
    prices: [{ amount: 199.99, currency: "USD" }],
    images: [
      {
        src: "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/1968/7031/Plus-1__34215.1674847345.1280.1280__92699.1675093557.jpg?c=2",
        alt: "PiKVM main"
      },
      {
        src: "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/1968/7032/Plus-2__79690.1674847358.1280.1280__03489.1675093573.jpg?c=2",
        alt: "PiKVM top view"
      },
      {
        src: "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/1968/7033/Plus-3__42612.1674847369.1280.1280__06848.1675093585.jpg?c=2",
        alt: "PiKVM accessories"
      }
    ],
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