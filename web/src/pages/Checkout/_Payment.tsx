import { Component, Show, createSignal } from "solid-js";
import { Elements } from "solid-stripe";
import TextInput from "~/components/Inputs/TextInput";
import { useCheckoutContext } from "./context";
import { StripeElementsWrapper } from "./_StripeElementsWrapper";
import OrdersApi from "~/api/orders";

export const Payment: Component = () => {
  const {
    stripe,
    orderStore,
    updateNotes,
    updateCoupons,
    isContinuingOrder,
  } = useCheckoutContext()

  const [coupon, setCoupon] = createSignal("")
  const [couponError, setCouponError] = createSignal("")

  async function applyCoupon() {
    const { result, error } = await OrdersApi.validateCoupon(coupon())
    if (error) {
      setCouponError(error.message)
      return
    }

    setCouponError("")
    updateCoupons([...orderStore.couponCodes, result!])
  }

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
        <TextInput
          label="Order Notes" value={orderStore.orderNotes}
          onChange={(e) => updateNotes(e.currentTarget.value)}
          disabled={isContinuingOrder()}
        />
      </div>

      <div class="mb-10">
        <TextInput
          label="Coupon Code"
          value={coupon()} error={couponError()}
          onInput={(e) => setCoupon(e.currentTarget.value)}
          disabled={isContinuingOrder()}
        />

        <div class="flex justify-between mt-2">
          <small class="label">
            {orderStore.couponCodes.length === 0 ? 'No' : orderStore.couponCodes.length} coupons applied
          </small>

          <button class="btn btn-primary" onclick={applyCoupon} disabled={coupon().length < 3}>Apply</button>
        </div>
      </div>
    </>
  )
}