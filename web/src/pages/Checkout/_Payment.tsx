import { Component, Show, createSignal, onMount } from "solid-js";
import { Card, Elements } from "solid-stripe";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import FormInput from "../../components/FormInput";

export const Payment: Component = () => {
  const [stripe, setStripe] = createSignal<Stripe | null>(null)

  onMount(async () => {
    const result = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    setStripe(result)
  })

  return (
    <>
      <div class="w-96 mb-5 bg-gray-300 p-3">
        <Show when={stripe()} fallback={<div>Loading Stripe</div>}>
          <Elements stripe={stripe()!}>
            {/* this is where your Stripe components go */}
            <Card />
          </Elements>
        </Show>
      </div>

      <div class="mb-10">
        <FormInput label="Order Notes" value="" />
      </div>
    </>
  )
}