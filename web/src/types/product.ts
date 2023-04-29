export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categories: ProductCategory[];
  prices?: ProductPrice[]
}

type ProductPrice = {
  currency: string;
  symbol: string;
  amount: number;
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
}