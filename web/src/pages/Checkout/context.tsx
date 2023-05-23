import { Component, JSXElement, createContext, createEffect, createSignal, onMount, useContext } from "solid-js";
import { Part, createStore } from "solid-js/store";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "@solidjs/router";
import { NotificationService } from "../../services/NotificationService";
import { Address, CheckoutContextProps, CheckoutSteps, Order, OrderStatus, defaultCheckout } from "../../types/order";
import { authStore } from "../../stores/auth";
import OrdersApi from "../../api/orders";
import { cart, resetCart } from "../../stores/cart";
import { getProductById } from "../../stores/products";
import { ProductType } from "../../types/product";
import PaymentsApi from "../../api/payments";
import ProductsApi from "../../api/products";

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
  const [subClientSecrets, setSubClientSecrets] = createSignal<string[]>()
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

  // TODO if possible this order status should not be updated from frontend
  // but from stripe webhooks. Dont have access to webhooks right now
  createEffect(() => {
    if (paymentSuccess()) {
      OrdersApi.updateStatus(order()!.id, OrderStatus.Paid)
      resetCart()
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

      const physicalItems = cart.items.filter(i => getProductById(i.productId)?.productType === ProductType.Physical)
      // Sometimes order will get created but payment can be failed, so we add !order() check to not
      // create order again
      if (!order() && physicalItems.length > 0) {
        const orderResp = await OrdersApi.create({
          ...orderStore,
          items: physicalItems,
          shippingSameAsBilling: shippingSameAsBilling()
        })
        setOrder(orderResp)
      }

      if (physicalItems.length > 0) {
        // orderResp.amount excludes amount for subscriptions
        const resp2 = await PaymentsApi.createPaymentIntent(user!.email, order()!.amount!)
        setClientSecret(resp2.clientSecret)
      }

      // Handle subscriptions - we create separate subscription for each
      // subscription item so they can be cancelled/updated individually,
      // although stripe allows to include multiple items in one subscription
      const subscriptionItems = cart.items.filter(i => getProductById(i.productId)?.productType === ProductType.OnlineService)
      // TODO should be one bulk request
      const subResponsePromises = subscriptionItems.map(i => {
        return PaymentsApi.createSubscription(user!.email, i.priceId!) // TODO also consider i.quantity
      })
      const subResponses = await Promise.all(subResponsePromises)
      const subData = subResponses.map((x, i) => ({
        subscriptionId: x.subscriptionId,
        productId: subscriptionItems[i].productId,
        priceId: subscriptionItems[i].priceId!
      }))
      await ProductsApi.createActiveProducts(subData)
      setSubClientSecrets(subResponses.map(x => x.clientSecret))
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
      subClientSecrets,
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