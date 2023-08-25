import { Component, Show } from "solid-js";
import { Card, Elements } from "solid-stripe";
import TextInput from "../../components/Inputs/TextInput";
import { useCheckoutContext } from "./context";
import { StripeElementsWrapper } from "./_StripeElementsWrapper";

export const Payment: Component = () => {
  const {
    stripe,
    orderStore,
    updateNotes,
    updateCoupon,
  } = useCheckoutContext()

  return (
    <>
      <div class="mb-5 bg-gray-300 p-3">
        <Show when={stripe()} fallback={<div>Loading Stripe</div>}>
          <Elements stripe={stripe()!}>
            <StripeElementsWrapper />
            {/* <Card /> */}
          </Elements>
        </Show>
      </div>

      <div class="mb-5">
        <TextInput label="Order Notes" value={orderStore.orderNotes} onChange={(e) => updateNotes(e.currentTarget.value)} />
      </div>

      <div class="mb-10">
        <TextInput label="Coupon Code" value={orderStore.couponCode} onChange={(e) => updateCoupon(e.currentTarget.value)} />
      </div>
    </>
  )
}