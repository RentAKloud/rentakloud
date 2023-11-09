import { Component, For, Show, createResource } from "solid-js";
import { Link } from "@solidjs/router";
import OrdersApi from "~/api/orders";
import Loader from "~/components/Loader";
import { DateTime } from "~/components/DateTime";
import { formatPrice, getTotalDiscounts } from "~/utils";

const Orders: Component = () => {
  const [orders] = createResource(async () => {
    const { result, error } = await OrdersApi.all()
    if (error) {
      throw error
    }

    return result
  })

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
                    const total = order.items.reduce((i, j) => i + (j.product.prices[0].saleAmount || j.product.prices[0].amount) * j.quantity, 0)
                    const discounts = getTotalDiscounts(order.coupons, total)

                    return (
                      <tr>
                        <th>{i() + 1}</th>
                        <td>{items}</td>
                        <td><DateTime value={order.createdAt} /></td>
                        <td>{formatPrice(total - discounts)}</td>
                        <td>{order.status}</td>
                        <td>
                          <Link href={`/dashboard/orders/${order.id}`} class="btn btn-info btn-xs link-hover">Details</Link>
                        </td>
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