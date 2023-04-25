import { Component, Show } from "solid-js";
import { Card, Elements } from "solid-stripe";
import FormInput from "../../components/FormInput";
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
        <FormInput label="Order Notes" value={orderStore.orderNotes} onChange={(val) => updateNotes(val)} />
      </div>

      <div class="mb-10">
        <FormInput label="Coupon Code" value={orderStore.couponCode} onChange={(val) => updateCoupon(val)} />
      </div>
    </>
  )
}