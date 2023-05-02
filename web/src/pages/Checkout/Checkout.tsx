import { Component, Show } from "solid-js";
import { Link } from "@solidjs/router";
import DefaultLayout from "../../layouts/DefaultLayout";
import { OrderDetails } from "./_OrderDetails";
import { BillingAndShipping } from "./_BillingAndShipping";
import { CheckoutProvider, useCheckoutContext } from "./context";
import { Payment } from "./_Payment";

const _Checkout: Component = () => {
  const { submit, inTransit, step, setStep } = useCheckoutContext()

  return (
    <DefaultLayout>
      <div class="m-5 md:m-20">
        <h1 class="text-4xl font-bold mb-5">Checkout</h1>

        <div class="flex flex-col md:flex-row gap-5 justify-between">
          <section class="border-2 rounded-box p-5 md:w-2/5">
            <Show when={step() === 'address'}>
              <h2 class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Billing & Shipping</h2>

              <BillingAndShipping />

              <button class="btn btn-primary" onclick={() => setStep('payment')}>Next</button>
            </Show>

            <Show when={step() === 'payment'}>
              <h2 class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Payment</h2>

              <Payment />

              <p class="mb-10">
                Please confirm all the details. Then click <strong>Confirm & Pay</strong> to finalize the order and make payment.
              </p>

              <Show when={!inTransit()} fallback={"Processing..."}>
                <div class="flex gap-5">
                  <button class="btn" onclick={() => setStep('address')}>Back</button>
                  <button class="btn btn-primary" onclick={submit}>Confirm & Pay</button>
                </div>
              </Show>
            </Show>

            <Show when={step() === 'congrats'}>
              <div class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Success</div>

              <p class="mb-10">
                Your order has been placed! You'll receive an email shortly.
              </p>

              <div class="flex gap-5">
                <Link href="/dashboard/orders" class="btn">My Orders</Link>
                <Link href="/dashboard" class="btn btn-primary">Dashboard</Link>
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