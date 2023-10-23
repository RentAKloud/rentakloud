import type { OutputData } from "@editorjs/editorjs"

export class Product {
  constructor(
    public id: number,
    public name: string,
    public shortDescription: string,
    public description: string,
    public descriptionEditor: OutputData,
    public categories: Category[],
    public prices: { amount: number, saleAmount?: number, currency: string }[],
    public images: { alt: string, src: string }[]
  ) { }
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
    public updatedAt: string
  ) { }

  static fullName(user: User) {
    const { firstName, lastName } = user
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    }
    return firstName || lastName
  }
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
    public coupons: CouponCode[],
    public status: OrderStatus,
    public notes: string,

    public createdAt: string,
    public updatedAt: string,

    public amount?: number, // only in create response
  ) { }

  static searchStr(order: Order) {
    return order.billingFirstName + " " + order.billingLastName
  }
}

export type CouponCode = {
  id: number;
  title: string;
  code: string;

  type: CouponType;
  flatDiscount: string; // Type Decimal is returned as string from backend
  percentageDiscount: number;
}

export enum CouponType {
  Flat = 'Flat',
  Percentage = 'Percentage'
}

export enum OrderStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Shipped = 'Shipped',
  Completed = 'Completed',
  OnHold = 'OnHold',
  Cancelled = 'Cancelled',
}