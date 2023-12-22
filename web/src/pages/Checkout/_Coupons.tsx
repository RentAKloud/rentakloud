import { Component, For, createSignal, onMount } from "solid-js";
import OrdersApi from "~/api/orders";
import TextInput from "~/components/Inputs/TextInput";
import { useCheckoutContext } from "./context";
import { CouponCode } from "~/types/order";
import { cart } from "~/stores/cart";

export const Coupons: Component = () => {
  const { updateCoupons, orderStore, isContinuingOrder } = useCheckoutContext()
  const [coupon, setCoupon] = createSignal("")
  const [couponError, setCouponError] = createSignal("")
  const [availableCoupons, setAvailableCoupons] = createSignal<CouponCode[]>([])

  async function listAvailableCoupons() {
    const { result } = await OrdersApi.getAvailableCoupons(cart.items)

    if (result) {
      setAvailableCoupons(result)
    }
  }

  async function applyCoupon(couponCode: string) {
    const { result, error } = await OrdersApi.validateCoupon(couponCode)
    if (error) {
      setCouponError(error.message)
      return
    }

    setCouponError("")
    updateCoupons([...orderStore.couponCodes, result!])
  }

  onMount(() => {
    listAvailableCoupons()
  })

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

        <button class="btn btn-primary" onclick={() => applyCoupon(coupon())} disabled={coupon().length < 3}>Apply</button>
      </div>

      <h4 class="font-bold mb-2">Available Coupons</h4>
      <ul>
        <For each={availableCoupons()}>
          {(c) => {
            const applied = orderStore.couponCodes.map(cc => cc.code).includes(c.code)

            return (
              <li class="mb-4 flex gap-4 justify-between">
                <span classList={{ "line-through": applied }}>{c.title} - {c.code}</span>
                <button
                  class="btn btn-xs btn-primary"
                  onclick={() => applyCoupon(c.code)}
                  disabled={orderStore.couponCodes.map(cc => cc.code).includes(c.code)}
                >
                  Apply
                </button>
              </li>
            )
          }}
        </For>
      </ul>
    </>
  )
}