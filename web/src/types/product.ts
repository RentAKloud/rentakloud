export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  contentAfterPrice?: string
  categories: ProductCategory[];
  prices?: ProductPrice[]
  stock: number
  images: ProductImage[]
  productType: ProductType;
  weight: number
  meta: any
}

type ProductImage = { alt: string, src: string, bg?: string }

export type ProductPrice = {
  currency: string;
  amount: number;
  saleAmount?: number;

  // for subscriptions
  planName?: string;
  prices?: PlanPrice[]
  features?: string[]
  configId: number
}

export type PlanPrice = {
  priceId: string
  interval: "month" | "year"
  intervalCount?: string
  currency: string
  amount: number
  saleAmount?: number
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

export type Instance = {
  id: string;
  title: string
  subscription: {
    product: Product;
  }
  addons: InstanceAddon[]
  createdAt: string;
  vncPath?: string;
  status: "Pending" | "Active" | "Inactive";
}

export type InstanceAddonKey = "cpu" | "ram" | "hdd" | "ssd"

export type InstanceAddon = {
  id: InstanceAddonKey
  quantity: number
}

export const productCategories: ProductCategory[] = ["Hardware", "Databases", "ERP", "CRM", "CMS", "Ecommerce", "Message Queueing"].map(c => ({
  slug: c.toLowerCase().replaceAll(' ', '-'),
  title: c,
}))

export type CartItem = {
  productId: number;
  quantity: number;
  priceId?: string;
  isTrial?: boolean
  configId?: number
}

export type CreateInstanceReq = {
  subscriptionId: string
  productId: number
  priceId: string
}