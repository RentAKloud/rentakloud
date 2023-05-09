export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categories: ProductCategory[];
  prices?: ProductPrice[]
  productType: ProductType;
}

export type ProductPrice = {
  currency: string;
  amount: number;

  // for subscriptions
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
export const productCategories: ProductCategory[] = ["Hardware", "Databases", "ERP", "CRM", "CMS", "Ecommerce", "Message Queueing"].map(c => ({
  slug: c.toLowerCase().replaceAll(' ', '-'),
  title: c,
}))

export type CartItem = {
  productId: number;
  quantity: number;
  priceId?: string;
}