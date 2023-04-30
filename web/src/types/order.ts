import { Accessor, Setter } from "solid-js";
import { Part } from "solid-js/store";
import { CartItem } from "./product";
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

  items: any[];
  coupons: CouponCode[];
  status: OrderStatus;
  notes: string;

  createdAt: string;
  updatedAt: string;
}

type CouponCode = {
  id: number;
  title: string;
  code: string;

  type: string;
  flatDiscount: number;
  percentageDiscount: number;
}

enum OrderStatus {
  Pending,
  Paid,
  Shipped,
  Completed,
  OnHold,
  Cancelled,
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
  couponCode: string;
}

export type CheckoutContextProps = {
  step: () => string;
  setStep: (step: "address" | "payment" | "confirm") => void;
  shippingSameAsBilling: Accessor<boolean>;
  setShippingSameAsBilling: Setter<boolean>;
  orderStore: OrderStore;
  updateBilling: (key: Part<Address, keyof Address>, val: string) => void;
  updateShipping: (key: Part<Address, keyof Address>, val: string) => void;
  updateNotes: (val: string) => void;
  updateCoupon: (val: string) => void;

  stripe: Accessor<Stripe | null>;
  clientSecret: Accessor<string | undefined>;
  submit: () => void;
  inTransit: Accessor<boolean>;
  setInTransit: (val: boolean) => void;
  formErrors: Accessor<string[]>;
}

export const defaultCheckout: CheckoutContextProps = {
  step: () => "",
  setStep(step) { },
  shippingSameAsBilling: () => true,
  setShippingSameAsBilling: (val: any) => val,
  updateBilling(key, val) { },
  updateShipping(key, val) { },
  updateNotes() { },
  updateCoupon() { },
  orderStore: {
    billingAddress: defaultAddress,
    shippingAddress: defaultAddress,
    orderNotes: "",
    couponCode: "",
  },
  stripe: () => null,
  clientSecret: () => undefined,
  submit() { },
  inTransit: () => false,
  setInTransit: () => false,
  formErrors: () => [],
}

export type OrderRequest = OrderStore & { items: CartItem[] }
export type OrderResponse = OrderRequest & { amount: number }