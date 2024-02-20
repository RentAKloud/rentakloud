import { Component, For, Show } from "solid-js";
import { useCheckoutContext } from "./context";
import { formatPrice, getOrderSubTotal, getTotalDiscounts } from "~/utils";
import CrossIcon from "~/components/icons/Cross";
import { orderItemDisplayData } from "../Orders/_Order_Details";

export const OrderDetails: Component = () => {
  const { step, order } = useCheckoutContext()
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
    <>
      <Show when={step() !== 'congrats' && order()}>
        <h4 class="font-bold">Items</h4>

        <For each={order()!.items} fallback={"Your cart is empty."}>
          {
            (item) => {
              const { interval, formattedPrice } = orderItemDisplayData(item)
              const product = () => item.product

              return (
                <div class="flex justify-between">
                  <div>{product().name} <Show when={interval}><span innerHTML={interval} /></Show></div>
                  <div>
                    <span>{formattedPrice}</span>
                    <span> <CrossIcon class="inline w-5" /> {item.quantity}</span>
                  </div>
                </div>
              )
            }
          }
        </For>

        <Show when={order()!.items.length > 0}>
          <div class="flex justify-between mt-5">
            <strong>Subtotal</strong>
            <span>{formatPrice(subTotal())}</span>
          </div>
          <div class="flex justify-between">
            <strong>Discount</strong>
            <span>-{formatPrice(discounts())}</span>
          </div>
          <div class="flex justify-between">
            <strong>Shipping</strong>
            <span>{formatPrice(shipping())}</span>
          </div>
          <div class="flex justify-between">
            <strong>Taxes</strong>
            <span>{formatPrice(taxes())}</span>
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