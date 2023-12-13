import { Component, Show } from "solid-js";
import DefaultLayout from "~/layouts/DefaultLayout";
import { CartSummary } from "./_CartSummary";
import { BillingAndShipping } from "./steps/BillingAndShipping";
import { CheckoutProvider, useCheckoutContext } from "./context";
import { Payment } from "./steps/Payment";
import { getCartTotal } from "~/stores/cart";
import { formatPrice } from "~/utils";
import { ONLINE_ORDER_AMOUNT_LIMIT } from "~/config/constants";
import { OrderDetails } from "./_OrderDetails";
import { Congrats } from "./steps/Congrats";
import { Coupons } from "./_Coupons";
import { ShippingMethod } from "./steps/ShippingMethod";

const _Checkout: Component = () => {
  const {
    submit, inTransit, step,
    setStep, isContinuingOrder,
    isCardInfoComplete,
    inReview, setInReview,
  } = useCheckoutContext()

  return (
    <DefaultLayout>
      <div class="m-5 md:m-20">
        <Show when={step() !== 'congrats'}>
          <h1 class="text-4xl font-bold mb-5">Checkout</h1>

          <Show when={isContinuingOrder()}>
            <p class="mb-6">Complete payment for your previous order.</p>
          </Show>

          <div class="flex flex-col md:flex-row gap-5 justify-between">
            <section class="border-2 rounded-box p-5 md:w-3/5 xl:w-2/5 bg-base-300">
              <Show when={step() === 'address'}>
                <h2 class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Billing & Shipping</h2>

                <BillingAndShipping next="shipping" />
              </Show>

              <Show when={step() === 'shipping'}>
                <h2 class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Shipping Method</h2>

                <ShippingMethod />

                <div class="flex gap-4">
                  <button class="btn" onclick={() => setStep('address')}>Back</button>
                  <button class="btn btn-primary" onclick={() => setStep('payment')}>Next</button>
                </div>
              </Show>

              <Show when={step() === 'payment'}>
                <h2 class="-mt-8 mb-8 bg-base-200 px-1 w-fit text-gray-400">Payment</h2>

                <Show
                  when={getCartTotal() > ONLINE_ORDER_AMOUNT_LIMIT}
                  fallback={<Payment />}
                >
                  <p class="mb-10">
                    Your order will be created, however, orders of value higher than <strong>{formatPrice(ONLINE_ORDER_AMOUNT_LIMIT)}</strong> cannot be processed online.
                    Please make a purchase order to <strong>sales@rentakloud.com</strong>
                  </p>
                </Show>

                <p class="my-10">
                  <Show when={inReview()} fallback={"Next review your order information, then confirm to make payment."}>
                    Please confirm all the details. Then click <strong>Confirm & Pay</strong> to finalize the order and make payment.
                  </Show>
                </p>

                <Show when={!inTransit()} fallback={"Processing..."}>
                  <div class="flex gap-5">
                    <button class="btn" onclick={() => setStep('shipping')} disabled={isContinuingOrder()}>Back</button>
                    <Show
                      when={!inReview()}
                      fallback={<button class="btn btn-primary" onclick={submit} disabled={!isCardInfoComplete()}>Confirm & Pay</button>}
                    >
                      <button class="btn btn-primary" onclick={() => setInReview(true)} disabled={!isCardInfoComplete()}>Review</button>
                    </Show>
                  </div>
                </Show>
              </Show>
            </section>

            <section>
              <div class="flex flex-col gap-8 sticky top-20">
                <div class="rounded-box bg-base-100 p-10 w-96">
                  <Show when={isContinuingOrder()} fallback={<CartSummary />}>
                    <OrderDetails />
                  </Show>
                </div>

                <div class="rounded-box bg-base-100 p-10 w-96">
                  <Coupons />
                </div>
              </div>
            </section>
          </div>
        </Show>

        <Show when={step() === 'congrats'}>
          <Congrats />
        </Show>
      </div>
    </DefaultLayout>
  )
}

const Checkout = () => <CheckoutProvider><_Checkout /></CheckoutProvider>

export default Checkout