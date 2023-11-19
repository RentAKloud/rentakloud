import { Component, For, Show, createResource, createSignal } from "solid-js";
import { Link } from "@solidjs/router";
import OrdersApi from "~/api/orders";
import Loader from "~/components/Loader";
import { DateTime } from "~/components/DateTime";
import { formatPrice } from "~/utils";
import Modal from "~/components/Modal";
import { Order, OrderStatus } from "~/types/order";
import { NotificationService } from "~/services/NotificationService";

const Orders: Component = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = createSignal(false)
  const [selectedOrder, setSelectedOrder] = createSignal<Order | null>(null)

  const [orders, { refetch }] = createResource(async () => {
    const { result, error } = await OrdersApi.all()
    if (error) {
      throw error
    }

    return result
  })

  async function cancelOrder(id: number) {
    const { error } = await OrdersApi.updateStatus(id, OrderStatus.Cancelled)
    if (!error) {
      NotificationService.success(`Order #${id} was cancelled successfully!`)
      setTimeout(refetch, 1000)
    }
    setIsCancelModalOpen(false)
  }

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
                    // const total = order.items.reduce((i, j) => i + (j.product.prices[0].saleAmount || j.product.prices[0].amount) * j.quantity, 0)
                    // const discounts = getTotalDiscounts(order.coupons, total)

                    return (
                      <tr>
                        <th>{i() + 1}</th>
                        <td>{items}</td>
                        <td><DateTime value={order.createdAt} /></td>
                        <td>{formatPrice(order.amount || 0)}</td>
                        <td>{order.status}</td>
                        <td class="flex gap-4">
                          <Link href={`/dashboard/orders/${order.id}`} class="btn btn-info btn-xs link-hover">Details</Link>
                          <Show when={[OrderStatus.Pending, OrderStatus.OnHold, OrderStatus.Paid].includes(order.status)}>
                            <button class="btn btn-error btn-xs" onclick={() => {
                              setSelectedOrder(order)
                              setIsCancelModalOpen(true)
                            }}>Cancel</button>
                          </Show>
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

      <Modal
        isOpen={isCancelModalOpen()}
        onClose={() => setIsCancelModalOpen(false)}
        title="Confirm Cancellation"
        description={`Are you sure you want to cancel order #${selectedOrder()!.id}?`}
        actions={
          <>
            <button class="btn" onclick={() => setIsCancelModalOpen(false)}>No</button>
            <button class="btn btn-error" onclick={() => cancelOrder(selectedOrder()!.id)}>Yes</button>
          </>
        } />
    </>
  )
}

export default Orders