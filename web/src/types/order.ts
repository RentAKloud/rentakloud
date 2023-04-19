import { Accessor, Setter } from "solid-js";
import { Part } from "solid-js/store";
import { Product } from "./product";

export type Address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export const defaultAddress: Address = {
  address1: "", address2: "", city: "", state: "",
  zip: "", country: ""
}

export type OrderStore = {
  billingAddress: Address;
  shippingAddress: Address;
  orderNotes: string;
  couponCode: string;
}

export type CheckoutContextProps = {
  shippingSameAsBilling: Accessor<boolean>;
  setShippingSameAsBilling: Setter<boolean>;
  orderStore: OrderStore;
  updateBilling: (key: Part<Address, keyof Address>, val: string) => void;
  updateShipping: (key: Part<Address, keyof Address>, val: string) => void;
}

export const defaultCheckout: CheckoutContextProps = {
  shippingSameAsBilling: () => true,
  setShippingSameAsBilling: (val: any) => val,
  updateBilling(key, val) {},
  updateShipping(key, val) {},
  orderStore: {
    billingAddress: defaultAddress,
    shippingAddress: defaultAddress,
    orderNotes: "",
    couponCode: "",
  },
}

export type OrderRequest = OrderStore & { items: Product[] }