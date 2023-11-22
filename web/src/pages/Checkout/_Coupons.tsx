import { Component, createSignal } from "solid-js";
import OrdersApi from "~/api/orders";
import TextInput from "~/components/Inputs/TextInput";
import { useCheckoutContext } from "./context";

export const Coupons: Component = () => {
  const { updateCoupons, orderStore, isContinuingOrder } = useCheckoutContext()
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
      <h4 class="mb-4">Apply Coupon Codes</h4>

      <TextInput
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
    </>
  )
}