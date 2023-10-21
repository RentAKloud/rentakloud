export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categories: ProductCategory[];
  prices?: ProductPrice[]
  stock: number
  images: {
    src: string
    alt: string
  }[]
  productType: ProductType;
}

export type ProductPrice = {
  currency: string;
  amount: number;
  saleAmount?: number;

  // for subscriptions
  planName?: string;
  priceId?: string;
  interval?: string;
  intervalCount?: string;
}

export enum ProductType {
  Physical = 'Physical',
  OnlineService = 'OnlineService'
}

export type ProductCategory = {
  id?: number;
  title: string;
  slug: string;
}

export type ActiveProduct = {
  id: string;
  product: Product;
  createdAt: string;
  status: "Active" | "Inactive";
}

export const productCategories: ProductCategory[] = ["Hardware", "Databases", "ERP", "CRM", "CMS", "Ecommerce", "Message Queueing"].map(c => ({
  slug: c.toLowerCase().replaceAll(' ', '-'),
  title: c,
}))

export type CartItem = {
  productId: number;
  quantity: number;
  priceId?: string;
}

export type SubscriptionData = {
  subscriptionId: string
  productId: number
  priceId: string
}