import { Component, JSXElement, createContext, createSignal, useContext } from "solid-js";
import { Part, createStore } from "solid-js/store";
import { Address, CheckoutContextProps, defaultCheckout } from "../../types/order";

const CheckoutContext = createContext<CheckoutContextProps>(defaultCheckout)

export const useCheckoutContext = () => {
  return useContext(CheckoutContext)
}

export const CheckoutProvider: Component<{ children: JSXElement }> = (props) => {
  const [shippingSameAsBilling, setShippingSameAsBilling] = createSignal(true)
  const [orderStore, setOrderStore] = createStore(defaultCheckout.orderStore)

  function updateBilling(key: Part<Address, keyof Address>, val: string) {
    setOrderStore("billingAddress", key, val)
  }

  function updateShipping(key: Part<Address, keyof Address>, val: string) {
    setOrderStore("shippingAddress", key, val)
  }

  return (
    <CheckoutContext.Provider value={{
      shippingSameAsBilling,
      setShippingSameAsBilling,
      orderStore,
      updateBilling,
      updateShipping,
    }}>
      {props.children}
    </CheckoutContext.Provider>
  )
}