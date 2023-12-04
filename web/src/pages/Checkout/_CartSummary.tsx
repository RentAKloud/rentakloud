import { Component, For, Show } from "solid-js";
import { cart, getCartTotal } from "~/stores/cart";
import { getProductById, getProductPrice, products } from "~/stores/products";
import { useCheckoutContext } from "./context";
import { formatPrice, getTotalDiscounts } from "~/utils";

export const CartSummary: Component<{ showAddresses?: boolean }> = (props) => {
  const { orderStore, shippingSameAsBilling } = useCheckoutContext()
  const subTotal = () => getCartTotal()
  const discounts = () => getTotalDiscounts(orderStore.couponCodes, subTotal())
  const shipping = () => orderStore.shippingMethod?.cost || 0
  const taxesTotal = () => orderStore.taxes.reduce((curr, next) => curr + next.amount, 0)
  const finalTotal = () => subTotal() + shipping() + taxesTotal() - discounts()

  return (
    <>
      <Show when={props.showAddresses}>
        <h4 class="font-bold">Billing Address</h4>
        <p class="mb-4">
          {orderStore.billingAddress.firstName} {orderStore.billingAddress.lastName}<br />
          {orderStore.billingAddress.address}<br />
          {orderStore.billingAddress.address2 ? <>{orderStore.billingAddress.address2}<br /></> : ''}
          {orderStore.billingAddress.city}, {orderStore.billingAddress.state}<br />
          {orderStore.billingAddress.country}<br />
          {orderStore.billingAddress.zip}<br />
          {orderStore.billingAddress.email}<br />
          {orderStore.billingAddress.phone}<br />
        </p>

        <Show when={!shippingSameAsBilling()} fallback={<p class="mb-4">Shipping address is same as billing address.</p>}>
          <h4 class="font-bold">Shipping Address</h4>
          <p class="mb-4">
            {orderStore.shippingAddress.firstName} {orderStore.shippingAddress.lastName}<br />
            {orderStore.shippingAddress.address}<br />
            {orderStore.shippingAddress.address2 ? <>{orderStore.shippingAddress.address2}<br /></> : ''}
            {orderStore.shippingAddress.city}, {orderStore.shippingAddress.state}<br />
            {orderStore.shippingAddress.country}<br />
            {orderStore.shippingAddress.zip}<br />
          </p>
        </Show>
      </Show>

      <Show when={!products.loading}>
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
          <Show when={discounts() > 0}>
            <div class="flex justify-between">
              <strong>Discount</strong>
              <span>-{formatPrice(discounts())}</span>
            </div>
          </Show>
          <div class="flex justify-between">
            <strong>Shipping</strong>
            <span>{formatPrice(shipping())}</span>
          </div>
          <div class="flex justify-between">
            <strong>Taxes</strong>
            <span>{formatPrice(taxesTotal())}</span>
          </div>

          <div class="flex justify-between mt-5">
            <strong>Total</strong>
            <span>{formatPrice(finalTotal())}</span>
          </div>
        </Show>
      </Show>

      {/* <Show when={step() === 'congrats'}>
        <Lottie src="https://assets7.lottiefiles.com/packages/lf20_m3ixidnq.json" />
      </Show> */}
    </>
  )
}