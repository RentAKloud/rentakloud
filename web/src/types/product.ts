export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  contentAfterPrice?: string;
  categories: ProductCategory[];
  prices?: ProductPrice[];
  stock: number;
  images: ProductImage[];
  productType: ProductType;
  weight: number;
  meta: ProductMeta;
};

type ProductMeta = any & {
  tags: ProductTag[];
  order: number;
};

type ProductTag = "featured" | "primary-nav" | "footer";

type ProductImage = { alt: string; src: string; bg?: string };

export type ProductPrice = {
  currency: string;
  amount: number;
  saleAmount?: number;

  // for subscriptions
  id?: number;
  planName?: string;
  prices?: PlanPrice[];
  features?: PlanFeature[];
  configId: number;
};

export type PlanFeature = {
  text: string;
  html: string;
  description?: string;
};

export type PlanPrice = {
  priceId: string;
  interval: "month" | "year";
  intervalCount?: string;
  currency: string;
  amount: number;
  saleAmount?: number;
};

export enum ProductType {
  Physical = "Physical",
  OnlineService = "OnlineService",
}

export type ProductCategory = {
  id?: number;
  title: string;
  slug: string;
};

export const productCategories: ProductCategory[] = [
  "Hardware",
  "Databases",
  "ERP",
  "CRM",
  "CMS",
  "Ecommerce",
  "Message Queueing",
].map((c) => ({
  slug: c.toLowerCase().replaceAll(" ", "-"),
  title: c,
}));

export type CartItem = {
  productId: number;
  quantity: number;
  planId?: number;
  priceId?: string;
  isTrial?: boolean;
  configId?: number;
};
