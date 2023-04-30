import { Component, For, Show } from "solid-js";
import { cart, getCartTotal } from "../../stores/cart";
import { getProductById } from "../../stores/products";

export const OrderDetails: Component = () => {
  const currency = () => getProductById(cart.items[0].productId)!.prices![0].currency

  return (
    <>
      <h4 class="font-bold">Items</h4>

      <For each={cart.items} fallback={"no cart items :("}>
        {
          (item) => {
            const product = () => getProductById(item.productId)!
            const price = () => product().prices![0]
            return (
              <div class="flex justify-between">
                <span>{product().name}</span>
                <div>
                  <span>{price().amount} {price().currency}</span>
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
          <span>{getCartTotal()} {currency()}</span>
        </div>
        <div class="flex justify-between">
          <strong>Discount</strong>
          <span>-{"0.00"} {currency()}</span>
        </div>
        <div class="flex justify-between">
          <strong>Taxes</strong>
          <span>{"0.00"} {currency()}</span>
        </div>
        <div class="flex justify-between">
          <strong>Shipping</strong>
          <span>{"0.00"} {currency()}</span>
        </div>

        <div class="flex justify-between mt-5">
          <strong>Total</strong>
          <span>{getCartTotal()} {currency()}</span>
        </div>
      </Show>
    </>
  )
}