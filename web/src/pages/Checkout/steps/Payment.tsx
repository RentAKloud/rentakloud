import { Component, Show, onMount } from "solid-js";
import { Elements } from "solid-stripe";
import TextInput from "~/components/Inputs/TextInput";
import { useCheckoutContext } from "../context";
import { StripeElementsWrapper } from "../_StripeElementsWrapper";
import { CartSummary } from "../_CartSummary";

export const Payment: Component = () => {
  const {
    stripe,
    orderStore,
    updateNotes,
    isContinuingOrder,
    inReview,
    setInReview,
    setIsCardInfoComplete,
  } = useCheckoutContext()

  onMount(() => {
    setInReview(false)
    setIsCardInfoComplete(false)
  })

  return (
    <>
      <div classList={{
        "hidden": inReview()
      }}>
        <div class="mb-5 bg-gray-300 p-3">
          <Show when={stripe()} fallback={<div>Loading Stripe</div>}>
            <Elements stripe={stripe()!}>
              <StripeElementsWrapper />
              {/* <Card /> */}
            </Elements>
          </Show>
        </div>

        <div class="mb-5">
          <TextInput
            label="Order Notes" value={orderStore.orderNotes}
            onChange={(e) => updateNotes(e.currentTarget.value)}
            disabled={isContinuingOrder()}
          />
        </div>
      </div>

      <Show when={inReview()}>
        <CartSummary showAddresses />
      </Show>
    </>
  )
}