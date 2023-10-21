import { Component, For, Show, createResource } from "solid-js";
import Loader from "~/components/Loader";
import { DateTime } from "~/components/DateTime";
import PaymentsApi from "~/api/payments";

const Payments: Component = () => {
  const [payments] = createResource(async () => {
    const { result, error } = await PaymentsApi.all()
    if (error) throw error
    return result
  })

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Payments</h2>

      <Show when={payments.loading}>
        <Loader />
      </Show>

      <Show when={payments()?.length === 0}>
        No payments yet.
      </Show>

      <Show when={(payments() || []).length > 0}>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <For each={payments()}>
                {
                  (p, i) => {
                    return (
                      <tr>
                        <th>{i() + 1}</th>
                        <td>{p.orderId}</td>
                        <td><DateTime value={p.createdAt} /></td>
                        <td>{p.amount} {p.currency}</td>
                      </tr>
                    )
                  }
                }
              </For>
            </tbody>
          </table>
        </div>
      </Show>
    </>
  )
}

export default Payments