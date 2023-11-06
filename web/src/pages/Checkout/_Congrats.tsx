import { Component, For, Show } from "solid-js";
import { useCheckoutContext } from "./context";
import { formatPrice, getOrderSubTotal, getTotalDiscounts } from "~/utils";

export const Congrats: Component = () => {
  const { order } = useCheckoutContext()

  const subTotal = () => order() ? getOrderSubTotal(order()!) : 0
  const discounts = () => order() ? getTotalDiscounts(order()!.coupons, subTotal()) : 0
  const finalTotal = () => subTotal() - discounts()

  return (
    <div class="mb-10">
      <p class="mb-6">Your order has been placed! You'll receive an email shortly.</p>

      <h3 class="font-bold mb-2">Order Summary</h3>
      <Show when={order()}>
        <table class="table mb-2">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <For each={order()!.items} fallback={"This order seems empty."}>
              {(item, i) => {
                const product = item.product
                const price = () => product.prices[0]
                const interval = () => price().priceId ? ` &cross; ${price().planName} ${price().interval}ly` : ""
                const formattedPrice = () => formatPrice(price().saleAmount || price().amount)
                const formattedTotal = () => formatPrice((price().saleAmount || price().amount) * item.quantity)

                return (
                  <tr>
                    <td>{i() + 1}</td>
                    <td>{product.name} <Show when={interval()}><span innerHTML={interval()} /></Show></td>
                    <td>{formattedPrice()}</td>
                    <td>{item.quantity}</td>
                    <td>{formattedTotal()}</td>
                  </tr>
                )
              }}
            </For>
          </tbody>
        </table>

        <div class="flex justify-end gap-4">
          <div class="flex flex-col ">
            <strong>Subtotal</strong>
            <strong>Discount</strong>
            <strong>Taxes</strong>
            <strong>Shipping</strong>
            <strong class="mt-2">Total</strong>
          </div>
          <div class="flex flex-col text-right">
            <span>{formatPrice(subTotal())}</span>
            <span>-{formatPrice(discounts())}</span>
            <span>{formatPrice(0)}</span>
            <span>{formatPrice(0)}</span>
            <span class="mt-2">{formatPrice(finalTotal())}</span>
          </div>
        </div>
      </Show>
    </div>
  )
}