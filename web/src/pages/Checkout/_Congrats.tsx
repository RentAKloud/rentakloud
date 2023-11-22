import { Component, For, Show, createSignal } from "solid-js";
import { Link } from "@solidjs/router";
import { useCheckoutContext } from "./context";
import { formatPrice, getOrderSubTotal, getTotalDiscounts } from "~/utils";
import Lottie from "~/components/Lottie";
import confetti from '~/assets/lotties/lf20_m3ixidnq.json'

export const Congrats: Component = () => {
  const { order } = useCheckoutContext()

  const subTotal = () => order() ? getOrderSubTotal(order()!) : 0
  const discounts = () => order() ? getTotalDiscounts(order()!.coupons, subTotal()) : 0
  const taxes = () => order() ? order()!.taxes.reduce((curr, next) => curr + next.amount, 0) : 0
  const finalTotal = () => subTotal() + taxes() - discounts()

  const [showConfetti, setShowConfetti] = createSignal(true)

  setTimeout(() => {
    setShowConfetti(false)
  }, 2400)

  return (
    <>
      <h1 class="text-4xl md:text-5xl text-center font-bold my-14">Congratulations!</h1>

      <div
        class="fixed top-0 bottom-0 left-0 right-0 z-10 grid place-content-center transition duration-1000 pointer-events-none"
        classList={{
          "opacity-100": showConfetti(),
          "opacity-0": !showConfetti(),
        }}
      >
        <div class="absolute bg-base-300 opacity-50 w-full h-full" />
        <Lottie src={confetti} />
      </div>

      <p class="mb-6">
        Your order has been placed successfully! You'll receive an email soon with the your order details.
        We will also email you once your order has been shipped.
      </p>

      <div class="w-full md:w-1/2">
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
              <span>{formatPrice(0)}</span>
              <span>{formatPrice(taxes())}</span>
              <span class="mt-2">{formatPrice(finalTotal())}</span>
            </div>
          </div>
        </Show>
      </div>

      <div class="flex gap-5 mt-10">
        <Link href={`/dashboard/orders/${order()?.id}`} class="btn btn-primary">Order Details</Link>
        <Link href="/dashboard/orders" class="btn btn-outline">Order History</Link>
      </div>
    </>
  )
}