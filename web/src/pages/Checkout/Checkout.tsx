import { Component, Show } from "solid-js";
import { Link } from "@solidjs/router";
import DefaultLayout from "~/layouts/DefaultLayout";
import { CartSummary } from "./_CartSummary";
import { BillingAndShipping } from "./_BillingAndShipping";
import { CheckoutProvider, useCheckoutContext } from "./context";
import { Payment } from "./_Payment";
import { getCartTotal } from "~/stores/cart";
import { formatPrice } from "~/utils";
import { ONLINE_ORDER_AMOUNT_LIMIT } from "~/config/constants";
import { OrderDetails } from "./_OrderDetails";

const _Checkout: Component = () => {
  const {
    submit, inTransit, step,
    setStep, isContinuingOrder, order
  } = useCheckoutContext()

  return (
    <DefaultLayout>
      <div class="m-5 md:m-20">
        <h1 class="text-4xl font-bold mb-5">Checkout</h1>

        <Show when={isContinuingOrder()}>
          <p class="mb-6">Complete payment for your previous order.</p>
        </Show>

        <div class="flex flex-col md:flex-row gap-5 justify-between">
          <section class="border-2 rounded-box p-5 md:w-3/5 xl:w-2/5 bg-base-300">
            <Show when={step() === 'address'}>
              <h2 class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Billing & Shipping</h2>

              <BillingAndShipping />

              <button class="btn btn-primary" onclick={() => setStep('payment')}>Next</button>
            </Show>

            <Show when={step() === 'payment'}>
              <h2 class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Payment</h2>

              <Show when={getCartTotal() <= ONLINE_ORDER_AMOUNT_LIMIT}>
                <Payment />
              </Show>

              <Show when={getCartTotal() > ONLINE_ORDER_AMOUNT_LIMIT}>
                <p class="mb-10">
                  Your order will be created, however, orders of value higher than <strong>{formatPrice(ONLINE_ORDER_AMOUNT_LIMIT)}</strong> cannot be processed online.
                  Please make a purchase order to <strong>sales@rentakloud.com</strong>
                </p>
              </Show>

              <p class="mb-10">
                Please confirm all the details. Then click <strong>Confirm & Pay</strong> to finalize the order and make payment.
              </p>

              <Show when={!inTransit()} fallback={"Processing..."}>
                <div class="flex gap-5">
                  <button class="btn" onclick={() => setStep('address')} disabled={isContinuingOrder()}>Back</button>
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
                <Link href={`/dashboard/orders/${order()?.id}`} class="btn">Order Details</Link>
                <Link href="/dashboard/orders" class="btn btn-primary">Order History</Link>
              </div>
            </Show>
          </section>

          <section>
            <div class="rounded-box bg-base-100 p-10 w-96 sticky top-20">
              <Show when={isContinuingOrder()} fallback={<CartSummary />}>
                <OrderDetails />
              </Show>
            </div>
          </section>
        </div>
      </div>
    </DefaultLayout>
  )
}

const Checkout = () => <CheckoutProvider><_Checkout /></CheckoutProvider>

export default Checkout