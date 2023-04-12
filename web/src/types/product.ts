export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  categories: ProductCategory[];
}

export type ProductCategory = "Hardware" | "Databases" | "ERP" | "CRM" | "CMS" | "Ecommerce" | "Message Queueing"