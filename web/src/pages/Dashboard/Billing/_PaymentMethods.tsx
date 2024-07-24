import { Component, createResource, For } from "solid-js";
import PaymentsApi from "~/api/payments";
import { Icon } from "~/components/icons";
import { paymentMethods } from "~/config/data";

const PaymentMethods: Component = () => {
  const [methods] = createResource(async () => {
    const { result, error } = await PaymentsApi.paymentMethods();
    if (error) throw error;
    return result;
  });

  return (
    <div class="flex flex-col gap-6">
      <For each={methods.latest || []}>
        {(method) => (
          <div class="flex justify-between items-center p-5 hover:bg-neutral/50 transition">
            <div class="flex flex-col">
              <div class="flex gap-6 mb-4">
                <img
                  src={paymentMethods[method.card.brand]}
                  class="w-10 inline"
                />
                <span>**** **** **** {method.card.last4}</span>
              </div>
              <div>
                Expires At {method.card.exp_month} / {method.card.exp_year}
              </div>
            </div>

            <div>
              <button class="btn btn-error btn-outline">
                <Icon.Trash />
              </button>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default PaymentMethods;
