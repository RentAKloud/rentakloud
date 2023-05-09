import { Component, For, Show } from "solid-js";
import { cart, getCartTotal } from "../../stores/cart";
import { formatPrice, getProductById, getProductPrice } from "../../stores/products";
import { useCheckoutContext } from "./context";
import Lottie from "../../components/Lottie";

export const OrderDetails: Component = () => {
  const { step } = useCheckoutContext()

  return (
    <>
      <Show when={step() !== 'congrats'}>
        <h4 class="font-bold">Items</h4>

        <For each={cart.items} fallback={"Your cart is empty."}>
          {
            (item) => {
              const product = () => getProductById(item.productId)!
              const price = () => getProductPrice(product(), item.priceId)
              return (
                <div class="flex justify-between">
                  <span>{product().name}</span>
                  <div>
                    <span>{formatPrice(price().amount)}</span>
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
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          <div class="flex justify-between">
            <strong>Discount</strong>
            <span>-{formatPrice(0)}</span>
          </div>
          <div class="flex justify-between">
            <strong>Taxes</strong>
            <span>{formatPrice(0)}</span>
          </div>
          <div class="flex justify-between">
            <strong>Shipping</strong>
            <span>{formatPrice(0)}</span>
          </div>

          <div class="flex justify-between mt-5">
            <strong>Total</strong>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
        </Show>
      </Show>

      <Show when={step() === 'congrats'}>
        <Lottie src="https://assets7.lottiefiles.com/packages/lf20_m3ixidnq.json" />
      </Show>
    </>
  )
}