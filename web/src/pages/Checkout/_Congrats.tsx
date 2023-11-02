import { Component, For, Show } from "solid-js";
import { useCheckoutContext } from "./context";
import { formatPrice } from "~/utils";

export const Congrats: Component = () => {
  const { order } = useCheckoutContext()

  return (
    <div class="mb-10">
      <p class="mb-6">Your order has been placed! You'll receive an email shortly.</p>

      <h3 class="font-bold mb-2">Order Summary</h3>
      <Show when={order()}>
        <table class="table mb-14">
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
      </Show>
    </div>
  )
}