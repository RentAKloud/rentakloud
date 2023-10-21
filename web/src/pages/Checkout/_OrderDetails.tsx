import { Component, For, Show } from "solid-js";
import { cart, getCartTotal } from "~/stores/cart";
import { getProductById, getProductPrice, products } from "~/stores/products";
import { useCheckoutContext } from "./context";
import Lottie from "~/components/Lottie";
import { formatPrice, getTotalDiscounts } from "~/utils";

export const OrderDetails: Component = () => {
  const { step, orderStore } = useCheckoutContext()
  const subTotal = () => getCartTotal()
  const discounts = () => getTotalDiscounts(orderStore.couponCodes, subTotal())

  return (
    <>
      <Show when={step() !== 'congrats' && !products.loading}>
        <h4 class="font-bold">Items</h4>

        <For each={cart.items} fallback={"Your cart is empty."}>
          {
            (item) => {
              const product = () => getProductById(item.productId)!
              const price = () => getProductPrice(product(), item.priceId)
              const interval = () => price().priceId ? ` &cross; ${price().planName} ${price().interval}ly` : ""
              const formattedPrice = () => formatPrice(price().saleAmount || price().amount)

              return (
                <div class="flex justify-between">
                  <div>{product().name} <Show when={interval()}><span innerHTML={interval()} /></Show></div>
                  <div>
                    <span>{formattedPrice()}</span>
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
            <span>{formatPrice(subTotal())}</span>
          </div>
          <div class="flex justify-between">
            <strong>Discount</strong>
            <span>-{formatPrice(discounts())}</span>
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
            <span>{formatPrice(subTotal() - discounts())}</span>
          </div>
        </Show>
      </Show>

      <Show when={step() === 'congrats'}>
        <Lottie src="https://assets7.lottiefiles.com/packages/lf20_m3ixidnq.json" />
      </Show>
    </>
  )
}