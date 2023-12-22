import { Accessor, Resource, Setter } from "solid-js";
import { Part } from "solid-js/store";
import { CartItem, Product, ProductPrice } from "./product";
import { Stripe } from "@stripe/stripe-js";
import { User } from "./user";
import { SelectOption } from "./ui";

export type Address = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string
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
  billingPhone: string;
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
  shipping: ShippingMethod & { amount: string }
  taxes: (Omit<Tax, 'amount'> & { amount: string })[]
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
  products: Product[] // to limit coupon usage to specific products
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
  firstName: "", lastName: "", email: "", phone: "",
  address: "", address2: "", city: "", state: "",
  zip: "", country: ""
}

export type OrderStore = {
  billingAddress: Address;
  shippingAddress: Address;
  orderNotes: string;
  couponCodes: CouponCode[];
  taxes: Tax[]
  shippingMethod: ShippingMethod | null
}

export type Tax = {
  title: string
  amount: number
  rate: number
}

export type ShippingMethod = {
  id: number
  name: string
  description: string
  cost: number
}

export type CheckoutSteps = "address" | "shipping" | "payment" | "congrats"
export type Step = {
  next?: CheckoutSteps
  previous?: CheckoutSteps
}

export type CheckoutContextProps = {
  isContinuingOrder: () => boolean
  order: Accessor<Order | undefined>
  inReview: Accessor<boolean>
  setInReview: Setter<boolean>
  step: () => CheckoutSteps;
  setStep: (step: CheckoutSteps) => void;
  shippingSameAsBilling: Accessor<boolean>;
  setShippingSameAsBilling: Setter<boolean>;
  orderStore: OrderStore;
  countryOptions: Resource<SelectOption[]>
  stateOptionsBilling: Resource<SelectOption[] | null>
  stateOptionsShipping: Resource<SelectOption[] | null>
  availableShippingMethods: Accessor<ShippingMethod[]>;
  updateBilling: (key: Part<Address, keyof Address>, val: string) => void;
  updateShipping: (key: Part<Address, keyof Address>, val: string) => void;
  updateShippingMethod: (val: ShippingMethod) => void;
  updateNotes: (val: string) => void;
  updateCoupons: (val: CouponCode[]) => void;

  stripe: Accessor<Stripe | null>;
  clientSecret: Accessor<string | undefined>;
  subClientSecrets: Accessor<string[] | undefined>;
  setPaymentSuccess: Setter<boolean>;
  setSubscriptionsPaid: Setter<boolean>;
  isCardInfoComplete: Accessor<boolean>
  setIsCardInfoComplete: Setter<boolean>
  submit: () => void;
  inTransit: Accessor<boolean>;
  setInTransit: Setter<boolean>;
  formErrors: Accessor<string[]>;
}

export const defaultCheckout: CheckoutContextProps = {
  isContinuingOrder: () => false,
  order: () => undefined,
  inReview: () => false,
  setInReview: (val: any) => val,
  step: () => "address",
  setStep(step) { },
  shippingSameAsBilling: () => true,
  setShippingSameAsBilling: (val: any) => val,
  updateBilling() { },
  updateShipping() { },
  updateShippingMethod() { },
  updateNotes() { },
  updateCoupons() { },
  orderStore: {
    billingAddress: defaultAddress,
    shippingAddress: defaultAddress,
    orderNotes: "",
    couponCodes: [],
    taxes: [],
    shippingMethod: null
  },
  // TODO fix types for default value of Resource
  //@ts-ignore
  countryOptions: undefined,
  //@ts-ignore
  stateOptionsBilling: undefined,
  //@ts-ignore
  stateOptionsShipping: undefined,
  availableShippingMethods: () => [],
  stripe: () => null,
  clientSecret: () => undefined,
  subClientSecrets: () => undefined,
  setPaymentSuccess: (val: any) => val,
  setSubscriptionsPaid: (val: any) => val,
  isCardInfoComplete: () => false,
  setIsCardInfoComplete: (val: any) => val,
  submit() { },
  inTransit: () => false,
  setInTransit: (val: any) => val,
  formErrors: () => [],
}

export type OrderRequest = OrderStore & { items: CartItem[], shippingSameAsBilling: boolean }
export type OrderResponse = Order & { amount: number }