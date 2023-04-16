import { Accessor, Component, JSXElement, Setter, createContext, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";

type OrderStore = {
  billingAddress: {};
  shippingAddress: {};
  orderNotes: string;
}

type CheckoutContextProps = {
  shippingSameAsBilling: Accessor<boolean>;
  setShippingSameAsBilling: Setter<boolean>;
  orderStore: OrderStore;
}

const defaultValue: CheckoutContextProps = {
  shippingSameAsBilling: () => false,
  setShippingSameAsBilling: (val: any) => val,
  orderStore: {
    billingAddress: {}, shippingAddress: {}, orderNotes: "lol"
  },
}

const CheckoutContext = createContext<CheckoutContextProps>(defaultValue)

export const useCheckoutContext = () => {
  return useContext(CheckoutContext)
}

export const CheckoutProvider: Component<{ children: JSXElement }> = (props) => {
  const [shippingSameAsBilling, setShippingSameAsBilling] = createSignal(true)
  const [orderStore, setOrderStore] = createStore(defaultValue.orderStore)

  return (
    <CheckoutContext.Provider value={{
      shippingSameAsBilling,
      setShippingSameAsBilling,
      orderStore,
    }}>
      {props.children}
    </CheckoutContext.Provider>
  )
}