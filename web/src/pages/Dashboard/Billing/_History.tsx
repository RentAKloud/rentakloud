import { Component, createResource, For, Show } from "solid-js";
import PaymentsApi from "~/api/payments";
import { DateTime } from "~/components/DateTime";
import Loader from "~/components/Loader";
import { formatPrice } from "~/utils";

const History: Component = () => {
  const [payments] = createResource(async () => {
    const { result, error } = await PaymentsApi.all();
    if (error) throw error;
    return result;
  });

  return (
    <>
      <Show when={payments.loading}>
        <Loader />
      </Show>

      <Show when={payments.latest?.length === 0}>No payments yet.</Show>

      <Show when={(payments.latest || []).length > 0}>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <For each={payments.latest}>
                {(p, i) => {
                  return (
                    <tr class="hover">
                      <th>{i() + 1}</th>
                      <td>{p.number}</td>
                      <td>
                        <DateTime value={p.created * 1000} />
                      </td>
                      <td>{formatPrice(p.amount_due / 100)}</td>
                    </tr>
                  );
                }}
              </For>
            </tbody>
          </table>
        </div>
      </Show>
    </>
  );
};

export default History;
