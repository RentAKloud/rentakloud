import { Component, JSXElement, createContext, createEffect, createResource, createSignal, onMount, useContext } from "solid-js";
import { Part, createStore } from "solid-js/store";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "@solidjs/router";
import { NotificationService } from "~/services/NotificationService";
import { Address, CheckoutContextProps, CheckoutSteps, CouponCode, Order, OrderStatus, OrderStore, ShippingMethod, defaultCheckout } from "~/types/order";
import { authStore } from "~/stores/auth";
import OrdersApi from "~/api/orders";
import PaymentsApi from "~/api/payments";
import ProductsApi from "~/api/products";
import { cart, getCartTotal, resetCart } from "~/stores/cart";
import { getProductById } from "~/stores/products";
import { CartItem, ProductType } from "~/types/product";
import { ONLINE_ORDER_AMOUNT_LIMIT } from "~/config/constants";
import { CountryCode, StateCode } from "~/types/common";
import { HttpService } from "~/services/HttpService";
import { appSettings } from "~/stores/global";

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
  const [inReview, setInReview] = createSignal(false)
  const isContinuingOrder = () => !!params.order
  const hasPhysical = () => cart.items.some(i => getProductById(i.productId)?.productType === ProductType.Physical)
  const hasServices = () => cart.items.some(i => getProductById(i.productId)?.productType === ProductType.OnlineService)

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
  const [availableShippingMethods, setAvailableShippingMethods] = createSignal<ShippingMethod[]>([])
  const [formErrors, setFormErrors] = createSignal<string[]>([])

  const [stripe, setStripe] = createSignal<Stripe | null>(null)
  const [clientSecret, setClientSecret] = createSignal<string>()
  const [subClientSecrets, setSubClientSecrets] = createSignal<string[]>()
  const [paymentSuccess, setPaymentSuccess] = createSignal<boolean>()
  const [subscriptionsPaid, setSubscriptionsPaid] = createSignal<boolean>()
  const [isCardInfoComplete, setIsCardInfoComplete] = createSignal<boolean>(false)

  const [countryOptions] = createResource(async () => {
    const { result, error } = await HttpService.get<CountryCode[]>('/countries')
    if (error) throw error
    return result!.map(c => ({ label: c.name, value: c.code }))
  })
  const [stateOptionsBilling] = createResource(() => orderStore.billingAddress.country, async () => {
    const { result, error } = await HttpService.get<StateCode[]>(`/states?country=${orderStore.billingAddress.country}`)
    if (error) throw error
    if (!result) return null
    return result!.map(c => ({ label: c.name, value: c.code }))
  })
  const [stateOptionsShipping] = createResource(() => orderStore.shippingAddress.country, async () => {
    const { result, error } = await HttpService.get<StateCode[]>(`/states?country=${orderStore.shippingAddress.country}`)
    if (error) throw error
    if (!result) return null
    return result!.map(c => ({ label: c.name, value: c.code }))
  })

  onMount(async () => {
    if (!step()) {
      setStep('address')
    }

    const result = await loadStripe(
      appSettings.latest?.isStripeTestMode ?
        import.meta.env.VITE_STRIPE_PUBLIC_KEY_TEST : import.meta.env.VITE_STRIPE_PUBLIC_KEY_LIVE
    )
    setStripe(result)
  })

  createEffect(() => {
    if (formErrors().find(e => e.includes("billingAddress")) !== undefined) {
      setStep("address")
    }

    if (isContinuingOrder() && order()) {
      setStep(order()!.status === OrderStatus.Pending ? 'payment' : 'congrats')
    }
  })

  // TODO if possible this order status should not be updated from frontend
  // but from stripe webhooks. Dont have access to webhooks right now
  createEffect(() => {
    if (paymentSuccess()) {
      OrdersApi.updateStatus(order()!.id, OrderStatus.Paid)
    }

    if (hasPhysical() && hasServices()) {
      if (paymentSuccess() && subscriptionsPaid()) {
        checkoutSuccessful()
      }
    } else if (hasPhysical() && paymentSuccess()) {
      checkoutSuccessful()
    } else if (hasServices() && subscriptionsPaid()) {
      checkoutSuccessful()
    } else if (isContinuingOrder() && paymentSuccess()) {
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

  function updateShippingMethod(val: ShippingMethod) {
    setOrderStore({ shippingMethod: val })
  }

  function updateNotes(val: string) {
    setOrderStore("orderNotes", val)
  }

  function updateCoupons(val: CouponCode[]) {
    setOrderStore("couponCodes", val)
  }

  createEffect(async () => {
    // shipping methods & taxes are based on shipping address
    const { city, state, zip, country } = shippingSameAsBilling() ? orderStore.billingAddress : orderStore.shippingAddress

    if (city || state || zip || country) {
      const { result, error } = await OrdersApi.estimateTaxes({ city, state, country, zip }, cart.items)
      if (!error) {
        setOrderStore({
          taxes: result!
        })
      }
    }

    if (city || state || country) {
      const { result, error } = await OrdersApi.getShippingMethods(
        { city, state, country, zip },
        cart.items.map(i => i.productId)
      )
      if (!error) {
        setAvailableShippingMethods(result!)
        updateShippingMethod(result![0])
      }
    }
  })

  const [inTransit, setInTransit] = createSignal(false)
  const [order, setOrder] = createSignal<Order>()

  if (isContinuingOrder()) {
    (async () => {
      const { result, error } = await OrdersApi.one(+params.order)
      if (error) {
        console.error("Could not fetch existing order", error)
      }

      setOrder(result!)
    })()
  }

  async function submit() {
    try {
      setInTransit(true)

      // Sometimes order will get created but payment can be failed, so we add !order() check to not
      // create order again
      if (!order() && cart.items.length > 0) {
        const orderResp = await OrdersApi.create({
          ...orderStore,
          items: cart.items,
          shippingSameAsBilling: shippingSameAsBilling()
        })
        if (!orderResp.error) {
          setOrder(orderResp.result!)
        } else {
          setInTransit(false)
          return
        }
      }

      if (getCartTotal() <= ONLINE_ORDER_AMOUNT_LIMIT) {
        await _paymentsFlow()
      } else {
        checkoutSuccessful()
      }
    } catch (err: any) {
      NotificationService.error("Something went wrong")
      setFormErrors(err.message.split(","))
      setInTransit(false)
    }
  }

  async function _paymentsFlow() {
    if (order()!.amount! > 0 || isContinuingOrder()) {
      // orderResp.amount excludes amount for subscriptions
      const resp2 = await PaymentsApi.createPaymentIntent(user!.email, order()!.amount!)
      if (!resp2.error) {
        setClientSecret(resp2.result!.clientSecret)
      }
    }

    // Handle subscriptions - we create separate subscription for each
    // subscription item so they can be cancelled/updated individually,
    // although stripe allows to include multiple items in one subscription
    const subscriptionItems: CartItem[] = cart.items
      .filter(i => getProductById(i.productId)?.productType === ProductType.OnlineService)
      // consider the quantity too
      .map(i => Array(i.quantity).fill(i))
      .flat()
    // TODO should be one bulk request
    if (subscriptionItems.length > 0) {
      const subResponsePromises = subscriptionItems.map(i => {
        return PaymentsApi.createSubscription(user!.email, i.priceId!, !!i.isTrial)
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
      hasPhysical,
      order,
      inReview,
      setInReview,

      step,
      setStep,
      shippingSameAsBilling,
      setShippingSameAsBilling,
      orderStore,
      countryOptions,
      stateOptionsBilling,
      stateOptionsShipping,
      availableShippingMethods,
      updateBilling,
      updateShipping,
      updateShippingMethod,
      updateNotes,
      updateCoupons,

      stripe,
      clientSecret,
      subClientSecrets,
      setPaymentSuccess,
      setSubscriptionsPaid,
      isCardInfoComplete,
      setIsCardInfoComplete,
      submit,
      inTransit,
      setInTransit,
      formErrors,
    }}>
      {props.children}
    </CheckoutContext.Provider>
  )
}