import { Component, For, Show } from "solid-js";
import { cart } from "../../stores/cart";

export const OrderDetails: Component = () => {
  const cartTotal = () => cart.items
    .map(i => i.product.prices![0].amount * i.quantity)
    .reduce((x, y) => x + y, 0)

  return (
    <>
      <h4 class="font-bold">Items</h4>

      <For each={cart.items} fallback={"no cart items :("}>
        {
          (item) => {
            const price = item.product.prices![0]
            return (
              <div class="flex justify-between">
                <span>{item.product.name}</span>
                <div>
                  <span>{price.amount} {price.currency}</span>
                  <span> &cross; {item.quantity}</span>
                </div>
              </div>
            )
          }
        }
      </For>

      <Show when={cart.items.length > 0}>
        <div class="flex justify-between mt-5">
          <strong>Subtotal</strong>
          <span>{cartTotal()} {cart.items[0].product.prices![0].currency}</span>
        </div>
        <div class="flex justify-between">
          <strong>Discount</strong>
          <span>-{"0.00"} {cart.items[0].product.prices![0].currency}</span>
        </div>
        <div class="flex justify-between">
          <strong>Taxes</strong>
          <span>{"0.00"} {cart.items[0].product.prices![0].currency}</span>
        </div>
        <div class="flex justify-between">
          <strong>Shipping</strong>
          <span>{"0.00"} {cart.items[0].product.prices![0].currency}</span>
        </div>

        <div class="flex justify-between mt-5">
          <strong>Total</strong>
          <span>{cartTotal()} {cart.items[0].product.prices![0].currency}</span>
        </div>
      </Show>
    </>
  )
}