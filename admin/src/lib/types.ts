import type { OutputData } from "@editorjs/editorjs"

export class Product {
  constructor(
    public id?: number,
    public name: string = "",
    public slug: string = "",
    public shortDescription: string = "",
    public description: string = "",
    public productType: ProductType = ProductType.Physical,
    public descriptionEditor: OutputData = { blocks: [] },
    public categories: Category[] = [],
    public prices: ProductPrice[] = [], // in case of OnlineService, this acts as a plan and further contains prices
    public images: ProductImage[] = [],
    public stock: number = 1,
    public weight: number = 0,
    public meta: any = {}
  ) { }
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
}

export type PlanPrice = {
  priceId: string;
  interval: "month" | "year";
  intervalCount?: string;
  currency: string;
  amount?: number;
  saleAmount?: number;
}

export enum ProductType {
  Physical = 'Physical',
  OnlineService = 'OnlineService'
}

export class Category {
  constructor(
    public id: number,
    public title: string,
    public slug: string
  ) { }
}

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public createdAt: string,
    public updatedAt: string,
    public profile?: Profile
  ) { }

  static fullName(user: User) {
    const { firstName, lastName } = user
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    }
    return firstName || lastName
  }
}

export type Profile = {
  preferredTheme: string
  stripeCustomerId: string
}

export class Order {
  constructor(
    public id: number,
    public user: User,
    public userId: number,

    public billingFirstName: string,
    public billingLastName: string,
    public billingEmail: string,
    public billingAddress: string,
    public billingAddress2: string,
    public billingCity: string,
    public billingState: string,
    public billingZip: string,
    public billingCountry: string,

    public shippingFirstName: string,
    public shippingLastName: string,
    public shippingAddress: string,
    public shippingAddress2: string,
    public shippingCity: string,
    public shippingState: string,
    public shippingZip: string,
    public shippingCountry: string,

    public items: any[],
    public status: OrderStatus,
    public notes: string,

    public createdAt: string | Date | null,
    public updatedAt: string,

    public coupons?: CouponCode[],
    public taxes?: any[],
    public amount?: number,
  ) { }

  static searchStr(order: Order) {
    return order.billingFirstName + " " + order.billingLastName + " " + order.billingEmail
  }
}

export type CouponCode = {
  id?: number;
  title: string;
  code: string;

  type: CouponType;
  flatDiscount: string; // Type Decimal is returned as string from backend
  percentageDiscount: number;
  active: boolean
  isPrivate: boolean
  maxUses?: number

  startsAt: string | Date | null
  expiresAt: string | Date | null

  products: Product[] // limit usage to these products

  createdAt?: string
  updatedAt?: string
}

export enum CouponType {
  Flat = 'Flat',
  Percentage = 'Percentage'
}

export const defaultCouponCode: CouponCode = {
  title: "",
  code: "",
  type: CouponType.Flat,
  flatDiscount: "0",
  percentageDiscount: 0,
  active: true,
  isPrivate: false,
  startsAt: null,
  expiresAt: null,
  products: []
}

export type CreateCouponCode = Omit<CouponCode, 'products'> & {
  products: number[]
  oldProducts: number[]
}

export enum OrderStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Shipped = 'Shipped',
  Completed = 'Completed',
  OnHold = 'OnHold',
  Cancelled = 'Cancelled',
}

// TODO put this in proper place
declare global {
  interface Date {
    toLocaleISOString(): string
  }
}

Date.prototype.toLocaleISOString = function (): string {
  return new Date(this.getTime() - this.getTimezoneOffset() * 1000 * 60).toISOString().replace('Z', '');
};