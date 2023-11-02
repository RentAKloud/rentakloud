import { Component, JSXElement, createContext, createEffect, createSignal, onMount, useContext } from "solid-js";
import { Part, createStore } from "solid-js/store";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "@solidjs/router";
import { NotificationService } from "~/services/NotificationService";
import { Address, CheckoutContextProps, CheckoutSteps, CouponCode, Order, OrderStatus, OrderStore, defaultCheckout } from "~/types/order";
import { authStore } from "~/stores/auth";
import OrdersApi from "~/api/orders";
import { cart, getCartTotal, resetCart } from "~/stores/cart";
import { getProductById } from "~/stores/products";
import { ProductType } from "~/types/product";
import PaymentsApi from "~/api/payments";
import ProductsApi from "~/api/products";
import { ONLINE_ORDER_AMOUNT_LIMIT } from "~/config/constants";

const CheckoutContext = createContext<CheckoutContextProps>(defaultCheckout)

export const useCheckoutContext = () => {
  return useContext(CheckoutContext)
}

export const CheckoutProvider: Component<{ children: JSXElement }> = (props) => {
  const { user } = authStore
  const [params, setParams] = useSearchParams()
  const step = () => params.step as CheckoutSteps
  function setStep(step: CheckoutSteps) {
    setParams({ step })
  }
  const isContinuingOrder = () => !!params.order

  const [shippingSameAsBilling, setShippingSameAsBilling] = createSignal(true)
  const [orderStore, setOrderStore] = createStore<OrderStore>({
    ...defaultCheckout.orderStore,
    billingAddress: {
      ...defaultCheckout.orderStore.billingAddress,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    }
  })
  const [formErrors, setFormErrors] = createSignal<string[]>([])

  const [stripe, setStripe] = createSignal<Stripe | null>(null)
  const [clientSecret, setClientSecret] = createSignal<string>()
  const [subClientSecrets, setSubClientSecrets] = createSignal<string[]>()
  const [paymentSuccess, setPaymentSuccess] = createSignal<boolean>()
  const [subscriptionsPaid, setSubscriptionsPaid] = createSignal<boolean>()

  onMount(async () => {
    if (isContinuingOrder() && order()) {
      setParams({ step: 'payment' })
    }

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
    }

    const hasPhysical = cart.items.some(i => getProductById(i.productId)?.productType === ProductType.Physical)
    const hasServices = cart.items.some(i => getProductById(i.productId)?.productType === ProductType.OnlineService)

    if (hasPhysical && hasServices) {
      if (paymentSuccess() && subscriptionsPaid()) {
        checkoutSuccessful()
      }
    } else if (hasPhysical && paymentSuccess()) {
      checkoutSuccessful()
    } else if (hasServices && subscriptionsPaid()) {
      checkoutSuccessful()
    } else if (isContinuingOrder()) {
      checkoutSuccessful()
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

  function updateCoupons(val: CouponCode[]) {
    setOrderStore("couponCodes", val)
  }

  const [inTransit, setInTransit] = createSignal(false)
  const [order, setOrder] = createSignal<Order>()

  if (isContinuingOrder()) {
    (async () => {
      const { result, error } = await OrdersApi.one(+params.order)
      if (error) {
        console.log("Could not fetch existing order")
      }

      console.log("it seems that an order already exists")
      setOrder(result!)
    })()
  }

  async function submit() {
    try {
      setInTransit(true)

      const physicalItems = cart.items.filter(i => getProductById(i.productId)?.productType === ProductType.Physical)
      // Sometimes order will get created but payment can be failed, so we add !order() check to not
      // create order again
      if (!order() && physicalItems.length > 0) {
        const orderResp = await OrdersApi.create({
          ...orderStore,
          items: physicalItems, // TODO should only need to send IDs here
          shippingSameAsBilling: shippingSameAsBilling()
        })
        if (!orderResp.error) {
          setOrder(orderResp.result!)
        }
      }

      if (getCartTotal() <= ONLINE_ORDER_AMOUNT_LIMIT) {
        _paymentsFlow(physicalItems.length > 0)
      } else {
        checkoutSuccessful()
      }
    } catch (err: any) {
      NotificationService.error("Something went wrong")
      setFormErrors(err.message.split(","))
    } finally {
      setInTransit(false)
    }
  }

  async function _paymentsFlow(chargeOrder: boolean) {
    if (chargeOrder || isContinuingOrder()) {
      // orderResp.amount excludes amount for subscriptions
      const resp2 = await PaymentsApi.createPaymentIntent(user!.email, order()!.amount!)
      if (!resp2.error) {
        setClientSecret(resp2.result!.clientSecret)
      }
    }

    // Handle subscriptions - we create separate subscription for each
    // subscription item so they can be cancelled/updated individually,
    // although stripe allows to include multiple items in one subscription
    const subscriptionItems = cart.items
      .filter(i => getProductById(i.productId)?.productType === ProductType.OnlineService)
      // consider the quantity too
      .map(i => Array(i.quantity).fill(i))
      .flat()
    // TODO should be one bulk request
    if (subscriptionItems.length > 0) {
      const subResponsePromises = subscriptionItems.map(i => {
        return PaymentsApi.createSubscription(user!.email, i.priceId!)
      })
      const subResponses = await Promise.all(subResponsePromises)
      const subData = subResponses.map((x, i) => ({
        subscriptionId: x.result!.subscriptionId,
        productId: subscriptionItems[i].productId,
        priceId: subscriptionItems[i].priceId!
      }))
      await ProductsApi.createActiveProducts(subData)
      const secrets = subResponses.map(x => x.result!.clientSecret)
      setSubClientSecrets(secrets)
    }
  }

  function checkoutSuccessful() {
    resetCart()
    setStep('congrats')
  }

  return (
    <CheckoutContext.Provider value={{
      isContinuingOrder,
      order,

      step,
      setStep,
      shippingSameAsBilling,
      setShippingSameAsBilling,
      orderStore,
      updateBilling,
      updateShipping,
      updateNotes,
      updateCoupons,

      stripe,
      clientSecret,
      subClientSecrets,
      setPaymentSuccess,
      setSubscriptionsPaid,
      submit,
      inTransit,
      setInTransit,
      formErrors,
    }}>
      {props.children}
    </CheckoutContext.Provider>
  )
}