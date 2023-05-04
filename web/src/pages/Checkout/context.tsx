import { Component, JSXElement, createContext, createEffect, createSignal, onMount, useContext } from "solid-js";
import { Part, createStore } from "solid-js/store";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "@solidjs/router";
import { NotificationService } from "../../services/NotificationService";
import { HttpService } from "../../services/HttpService";
import { Address, CheckoutContextProps, CheckoutSteps, Order, OrderStatus, defaultCheckout } from "../../types/order";
import { authStore } from "../../stores/auth";
import OrdersApi from "../../api/orders";
import { cart, resetCart } from "../../stores/cart";

const CheckoutContext = createContext<CheckoutContextProps>(defaultCheckout)

export const useCheckoutContext = () => {
  return useContext(CheckoutContext)
}

export const CheckoutProvider: Component<{ children: JSXElement }> = (props) => {
  const [shippingSameAsBilling, setShippingSameAsBilling] = createSignal(true)
  const [orderStore, setOrderStore] = createStore(defaultCheckout.orderStore)
  const [formErrors, setFormErrors] = createSignal<string[]>([])

  const [params, setParams] = useSearchParams()
  const step = () => params.step as CheckoutSteps
  function setStep(step: CheckoutSteps) {
    setParams({ step })
  }

  const [stripe, setStripe] = createSignal<Stripe | null>(null)
  const [clientSecret, setClientSecret] = createSignal<string>()
  const [paymentSuccess, setPaymentSuccess] = createSignal<boolean>()

  onMount(async () => {
    if (!step()) {
      setParams({ step: 'address' })
    }

    const result = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    setStripe(result)
  })

  createEffect(() => {
    if (formErrors().find(e => e.includes("billingAddress")) !== undefined) {
      setStep("address")
    }
  })

  createEffect(() => {
    if (paymentSuccess()) {
      OrdersApi.updateStatus(order()!.id, OrderStatus.Paid)
    }
  })

  function updateBilling(key: Part<Address, keyof Address>, val: string) {
    setOrderStore({
      billingAddress: {
        ...orderStore.billingAddress,
        [key as string]: val
      }
    })
  }

  function updateShipping(key: Part<Address, keyof Address>, val: string) {
    setOrderStore({
      shippingAddress: {
        ...orderStore.shippingAddress,
        [key as string]: val
      }
    })
  }

  function updateNotes(val: string) {
    setOrderStore("orderNotes", val)
  }

  function updateCoupon(val: string) {
    setOrderStore("couponCode", val)
  }

  const { user } = authStore
  const [inTransit, setInTransit] = createSignal(false)
  const [order, setOrder] = createSignal<Order>()

  async function submit() {
    try {
      setInTransit(true)
      const resp = await OrdersApi.create({
        ...orderStore,
        items: cart.items,
        shippingSameAsBilling: shippingSameAsBilling()
      })
      setOrder(resp)

      const resp2 = await HttpService.post<{
        clientSecret: string,
        ephemeralKey: string,
        customer: string
      }>('/payments/create-payment-intent', {
        email: user?.email,
        amount: resp.amount || 599, // TODO amount not yet returned from order response
      })

      setClientSecret(resp2.clientSecret)
      resetCart()
    } catch (err: any) {
      console.log(err)
      NotificationService.error("Something went wrong")
      setFormErrors(err.message.split(","))
    } finally {
      setInTransit(false)
    }
  }

  return (
    <CheckoutContext.Provider value={{
      step,
      setStep,
      shippingSameAsBilling,
      setShippingSameAsBilling,
      orderStore,
      updateBilling,
      updateShipping,
      updateNotes,
      updateCoupon,

      stripe,
      clientSecret,
      setPaymentSuccess,
      submit,
      inTransit,
      setInTransit,
      formErrors,
    }}>
      {props.children}
    </CheckoutContext.Provider>
  )
}