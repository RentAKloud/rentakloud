import { Component, Show, createSignal } from "solid-js";
import { Link } from "@solidjs/router";
import Lottie from "~/components/Lottie";
import confetti from '~/assets/lotties/lf20_m3ixidnq.json'
import { OrderSummary } from "../_OrderSummary";
import { useCheckoutContext } from "../context";

export const Congrats: Component = () => {
  const { order } = useCheckoutContext()

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

      <p class="mb-6 max-w-xl">
        Your order has been placed successfully! You'll receive an email soon with the order details.
        We will also email you once your order has been shipped.
      </p>

      <OrderSummary />

      <div class="flex gap-5 mt-10">
        <Show when={order()}>
          <Link href={`/dashboard/orders/${order()!.id}`} class="btn btn-primary">Order Details</Link>
        </Show>
        <Link href="/dashboard/orders" class="btn btn-outline">Order History</Link>
      </div>
    </>
  )
}