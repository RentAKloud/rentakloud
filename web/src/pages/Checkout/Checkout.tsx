import { Component, onMount, Show } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import DefaultLayout from "../../layouts/DefaultLayout";
import { NotificationService } from "../../services/NotificationService";
import { OrderDetails } from "./_OrderDetails";
import { BillingAndShipping } from "./_BillingAndShipping";
import { CheckoutProvider, useCheckoutContext } from "./context";
import { Payment } from "./_Payment";

const _Checkout: Component = () => {
  const [params, setParams] = useSearchParams()
  const step = () => params.step
  const { orderStore } = useCheckoutContext()

  onMount(async () => {
    if (!step()) {
      setParams({ step: 'address' })
    }
  })

  function submit() {
    NotificationService.success("Order created")
  }

  return (
    <DefaultLayout>
      <div class="m-20">
        <h1 class="text-4xl font-bold mb-5">Checkout</h1>

        <div class="flex flex-col md:flex-row justify-between">
          <section class="border-2 rounded-box p-5">
            <Show when={step() === 'address'}>
              <h2 class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Billing & Shipping</h2>

              <BillingAndShipping />

              <button class="btn btn-primary" onclick={() => setParams({ step: 'payment' })}>Next</button>
            </Show>

            <Show when={step() === 'payment'}>
              <h2 class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Payment</h2>

              <Payment />

              <div class="flex gap-5">
                <button class="btn" onclick={() => setParams({ step: 'address' })}>Back</button>
                <button class="btn btn-primary" onclick={() => setParams({ step: 'confirm' })}>Next</button>
              </div>
            </Show>

            <Show when={step() === 'confirm'}>
              <div class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Confirm</div>

              <p class="mb-10">
                Please confirm all the details. Then click proceed to finalize the order and make payment.
              </p>

              <div class="flex gap-5">
                <button class="btn" onclick={() => setParams({ step: 'payment' })}>Back</button>
                <button class="btn btn-primary" onclick={submit}>Proceed</button>
              </div>
            </Show>
          </section>

          <section>
            <div class="rounded-box bg-base-100 p-10 w-96 sticky top-20">
              <OrderDetails />
            </div>
          </section>
        </div>
      </div>
    </DefaultLayout>
  )
}

const Checkout = () => <CheckoutProvider><_Checkout /></CheckoutProvider>

export default Checkout