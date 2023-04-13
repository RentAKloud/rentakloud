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

export type ProductCategory = "Hardware" | "Databases" | "ERP" | "CRM" | "CMS" | "Ecommerce" | "Message Queueing"
export const productCategories: ProductCategory[] = ["Hardware", "Databases", "ERP", "CRM", "CMS", "Ecommerce", "Message Queueing"]