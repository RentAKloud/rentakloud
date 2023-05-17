import { Component, For, Show, createResource } from "solid-js";
import OrdersApi from "../../api/orders";
import Loader from "../../components/Loader";
import { DateTime } from "../../components/DateTime";
import { formatPrice } from "../../stores/products";

const Orders: Component = () => {
  const [orders] = createResource(OrdersApi.all)

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Order History</h2>

      <Show when={orders.loading}>
        <Loader />
      </Show>

      <Show when={orders()?.length === 0}>
        No orders yet.
      </Show>

      <Show when={(orders() || []).length > 0}>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Items</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <For each={orders()}>
                {
                  (order, i) => {
                    const items = order.items.length > 1 ? `${order.items.length} items` : order.items[0].product.name
                    const total = order.items.reduce((i, j) => i + j.product.prices[0].amount * j.quantity, 0)
                    return (
                      <tr>
                        <th>{i() + 1}</th>
                        <td>{items}</td>
                        <td><DateTime value={order.createdAt} /></td>
                        <td>{formatPrice(total)}</td>
                        <td>{order.status}</td>
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

export default Orders