import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Component, createSignal, onMount, Show } from "solid-js";
import { Card, Elements } from "solid-stripe";
import DefaultLayout from "../../layouts/DefaultLayout";

const Checkout: Component = () => {
  const [stripe, setStripe] = createSignal<Stripe | null>(null)

  onMount(async () => {
    const result = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    setStripe(result)
  })

  return (
    <DefaultLayout>
      <h1 class="text-4xl">Checkout Page</h1>

      <div class="flex flex-col">
        <section>
          <div>billing & shipping info</div>
          <div>
            <Show when={stripe()} fallback={<div>Loading stripe</div>}>
              <Elements stripe={stripe()!}>
                {/* this is where your Stripe components go */}
                <Card />
              </Elements>
            </Show>
          </div>
          <div>Confirm</div>
        </section>

        <section>
          Order details
        </section>
      </div>


    </DefaultLayout>
  )
}

export default Checkout