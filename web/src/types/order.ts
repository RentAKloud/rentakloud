import { Accessor, Setter } from "solid-js";
import { Part } from "solid-js/store";
import { CartItem, ProductPrice } from "./product";
import { Stripe } from "@stripe/stripe-js";
import { User } from "./user";

export type Address = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export type Order = {
  id: number;
  user: User;
  userId: number;
  
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingAddress: string;
  billingAddress2?: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;

  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingAddress2?: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;

  items: {
    product: {
      id: number
      name: string
      prices: ProductPrice[]
    }
    quantity: number
  }[];
  coupons: CouponCode[];
  status: OrderStatus;
  notes: string;

  createdAt: string;
  updatedAt: string;

  amount?: number; // only in create response
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

export const defaultAddress: Address = {
  firstName: "", lastName: "", email: "",
  address: "", address2: "", city: "", state: "",
  zip: "", country: ""
}

export type OrderStore = {
  billingAddress: Address;
  shippingAddress: Address;
  orderNotes: string;
  couponCodes: CouponCode[];
}

export type CheckoutSteps = "address" | "payment" | "congrats"

export type CheckoutContextProps = {
  isContinuingOrder: () => boolean
  order: Accessor<Order | undefined>
  step: () => CheckoutSteps;
  setStep: (step: CheckoutSteps) => void;
  shippingSameAsBilling: Accessor<boolean>;
  setShippingSameAsBilling: Setter<boolean>;
  orderStore: OrderStore;
  updateBilling: (key: Part<Address, keyof Address>, val: string) => void;
  updateShipping: (key: Part<Address, keyof Address>, val: string) => void;
  updateNotes: (val: string) => void;
  updateCoupons: (val: CouponCode[]) => void;

  stripe: Accessor<Stripe | null>;
  clientSecret: Accessor<string | undefined>;
  subClientSecrets: Accessor<string[] | undefined>;
  setPaymentSuccess: Setter<boolean>;
  setSubscriptionsPaid: Setter<boolean>;
  submit: () => void;
  inTransit: Accessor<boolean>;
  setInTransit: Setter<boolean>;
  formErrors: Accessor<string[]>;
}

export const defaultCheckout: CheckoutContextProps = {
  isContinuingOrder: () => false,
  order: () => undefined,
  step: () => "address",
  setStep(step) { },
  shippingSameAsBilling: () => true,
  setShippingSameAsBilling: (val: any) => val,
  updateBilling() { },
  updateShipping() { },
  updateNotes() { },
  updateCoupons() { },
  orderStore: {
    billingAddress: defaultAddress,
    shippingAddress: defaultAddress,
    orderNotes: "",
    couponCodes: [],
  },
  stripe: () => null,
  clientSecret: () => undefined,
  subClientSecrets: () => undefined,
  setPaymentSuccess: (val: any) => val,
  setSubscriptionsPaid: (val: any) => val,
  submit() { },
  inTransit: () => false,
  setInTransit: (val: any) => val,
  formErrors: () => [],
}

export type OrderRequest = OrderStore & { items: CartItem[], shippingSameAsBilling: boolean }
export type OrderResponse = Order & { amount: number }