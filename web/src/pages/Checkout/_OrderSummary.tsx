import { Component, Show } from "solid-js";
import { formatPrice, getOrderSubTotal, getTotalDiscounts } from "~/utils";
import { useCheckoutContext } from "./context";
import OrderDetails from "../Orders/_Order_Details";

export const OrderSummary: Component = () => {
  const { order } = useCheckoutContext()

  const subTotal = () => order() ? getOrderSubTotal(order()!) : 0
  const discounts = () => order() ? getTotalDiscounts(
    order()!.coupons,
    subTotal(),
    order()!.items.map(i => ({
      id: i.product.id,
      price: i.product.prices[0].amount,
      qty: i.quantity
    }))
  ) : 0
  const shipping = () => order() ? +order()!.shipping.amount : 0
  const taxes = () => order() ? order()!.taxes.reduce((curr, next) => curr + +next.amount, 0) : 0
  const finalTotal = () => subTotal() + shipping() + taxes() - discounts()

  return (
    <div class="w-full md:w-1/2">
      <h3 class="font-bold mb-2">Order Summary</h3>
      <Show when={order()}>
        <OrderDetails order={order()!} />

        <div class="flex justify-end gap-4">
          <div class="flex flex-col ">
            <strong>Subtotal</strong>
            <Show when={discounts() > 0}>
              <strong>Discount</strong>
            </Show>
            <strong>Shipping</strong>
            <strong>Taxes</strong>
            <strong class="mt-2">Total</strong>
          </div>
          <div class="flex flex-col text-right">
            <span>{formatPrice(subTotal())}</span>
            <Show when={discounts() > 0}>
              <span>-{formatPrice(discounts())}</span>
            </Show>
            <span>{formatPrice(shipping())}</span>
            <span>{formatPrice(taxes())}</span>
            <span class="mt-2">{formatPrice(finalTotal())}</span>
          </div>
        </div>
      </Show>
    </div>
  )
}