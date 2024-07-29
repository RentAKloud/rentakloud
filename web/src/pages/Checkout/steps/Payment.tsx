import {
  Component,
  For,
  Show,
  createResource,
  createSignal,
  onMount,
} from "solid-js";
import { Elements } from "solid-stripe";
import TextInput from "~/components/Inputs/TextInput";
import { useCheckoutContext } from "../context";
import { StripeElementsWrapper } from "../_StripeElementsWrapper";
import { CartSummary } from "../_CartSummary";
import { paymentMethods } from "~/config/data";
import PaymentsApi from "~/api/payments";
import Collapse from "~/components/Collapse/Collapse";

export const Payment: Component = () => {
  const {
    stripe,
    orderStore,
    updateNotes,
    isContinuingOrder,
    inReview,
    setInReview,
    setIsCardInfoComplete,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useCheckoutContext();

  onMount(() => {
    setInReview(false);
    setIsCardInfoComplete(false);
  });

  const [methods] = createResource(async () => {
    const { result, error } = await PaymentsApi.paymentMethods();
    if (error) throw error;
    return result!.data;
  });

  return (
    <>
      <div
        classList={{
          hidden: inReview(),
        }}
      >
        <div class="overflow-x-scroll mb-6">
          <div class="flex gap-4 w-fit">
            <For each={methods.latest}>
              {(method) => {
                return (
                  <div
                    class="flex flex-col w-36 border-2 border-base-100 rounded p-2 cursor-pointer"
                    classList={{
                      "hover:bg-base-100":
                        selectedPaymentMethod() !== method.id,
                      "bg-primary text-primary-content":
                        selectedPaymentMethod() === method.id,
                    }}
                    onclick={() =>
                      selectedPaymentMethod() === method.id
                        ? setSelectedPaymentMethod(null)
                        : setSelectedPaymentMethod(method.id)
                    }
                  >
                    <div class="flex gap-2 mb-4">
                      <img
                        src={paymentMethods[method.card.brand]}
                        class="w-10 inline"
                      />
                      <span> {method.card.last4}</span>
                    </div>
                    <div>
                      {method.card.exp_month} / {method.card.exp_year}
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </div>

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
            label="Order Notes"
            value={orderStore.orderNotes}
            onChange={(e) => updateNotes(e.currentTarget.value)}
            disabled={isContinuingOrder()}
          />
        </div>
      </div>

      <Show when={inReview()}>
        <CartSummary showAddresses />
      </Show>
    </>
  );
};
