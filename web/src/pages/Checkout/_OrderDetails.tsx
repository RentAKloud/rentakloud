import { Component, For, Show } from "solid-js";
import { cart, getCartTotal } from "../../stores/cart";
import { getProductById } from "../../stores/products";
import { useCheckoutContext } from "./context";
import Lottie from "../../components/Lottie";

export const OrderDetails: Component = () => {
  const { step } = useCheckoutContext()
  const currency = () => getProductById(cart.items[0].productId)!.prices![0].currency

  return (
    <>
      <Show when={step() !== 'congrats'}>
        <h4 class="font-bold">Items</h4>

        <For each={cart.items} fallback={"Your cart is empty."}>
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
      </Show>

      <Show when={step() === 'congrats'}>
        <Lottie src="https://assets7.lottiefiles.com/packages/lf20_m3ixidnq.json" />
      </Show>
    </>
  )
}