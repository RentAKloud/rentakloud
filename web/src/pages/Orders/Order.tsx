import { Component, For, Show, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import OrdersApi from "~/api/orders";
import Loader from "~/components/Loader";
import { DateTime } from "~/components/DateTime";
import { formatPrice, getOrderSubTotal, getTotalDiscounts } from "~/utils";
import { OrderStatus } from "~/types/order";

const Order: Component = () => {
  const params = useParams<{ id: string }>()
  const [order] = createResource(async () => {
    const { result, error } = await OrdersApi.one(+params.id)
    if (error) {
      throw error
    }

    return result
  })

  const subTotal = () => order() ? getOrderSubTotal(order()!) : 0
  const discounts = () => order() ? getTotalDiscounts(order()!.coupons, subTotal()) : 0
  const finalTotal = () => subTotal() - discounts()

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Order #{order()?.id || ''} Details</h2>

      <Show when={order.loading}>
        <Loader />
      </Show>

      <Show when={order()}>
        <div class="flex justify-between mb-8">
          <h3 class="text-2xl"><DateTime value={order()!.createdAt} /></h3>
          <h4
            class="text-xl"
            classList={{
              "text-green-500": [OrderStatus.Paid, OrderStatus.Completed].includes(order()!.status),
              "text-yellow-500": [OrderStatus.Pending, OrderStatus.OnHold].includes(order()!.status),
              "text-red-500": [OrderStatus.Cancelled].includes(order()!.status)
            }}
          >{order()!.status}</h4>
        </div>

        <div class="flex gap-20 mb-10">
          <div>
            <h4 class="font-bold">Billing Details</h4>
            <p>
              {order()!.billingFirstName} {order()!.billingLastName}<br />
              {order()!.billingAddress}<br />
              {order()!.billingAddress2 ? <>{order()!.billingAddress2}<br /></> : ''}
              {order()!.billingCity}, {order()!.billingState}, {order()!.billingZip}<br />
              {order()!.billingCountry}<br />
              {order()!.billingEmail}
              {/* {order()!.billingPhone} */}
            </p>
          </div>

          <div>
            <h4 class="font-bold">Shipping Details</h4>
            <p>
              {order()!.shippingFirstName} {order()!.shippingLastName}<br />
              {order()!.shippingAddress}<br />
              {order()!.shippingAddress2 ? <>{order()!.shippingAddress2}<br /></> : ''}
              {order()!.shippingCity}, {order()!.shippingState}, {order()!.shippingZip}<br />
              {order()!.shippingCountry}
            </p>
          </div>
        </div>

        <table class="table mb-14">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <For each={order()!.items} fallback={"This order seems empty."}>
              {
                (item, i) => {
                  const product = item.product
                  const price = () => product.prices[0]
                  const interval = () => price().priceId ? ` &cross; ${price().planName} ${price().interval}ly` : ""
                  const formattedPrice = () => formatPrice(price().saleAmount || price().amount)
                  const formattedTotal = () => formatPrice((price().saleAmount || price().amount) * item.quantity)

                  return (
                    <tr>
                      <td>{i() + 1}</td>
                      <td>{product.name} <Show when={interval()}><span innerHTML={interval()} /></Show></td>
                      <td>{formattedPrice()}</td>
                      <td>{item.quantity}</td>
                      <td>{formattedTotal()}</td>
                    </tr>
                  )
                }
              }
            </For>
          </tbody>
        </table>

        <Show when={order()!.items.length > 0}>
          <div class="flex justify-between gap-6">
            <div>
              <h4 class="font-bold mb-2">Coupons Applied</h4>
              <Show when={order()!.coupons.length === 0}>
                No coupons were applied
              </Show>

              <ul class="list-disc ml-4">
                <For each={order()!.coupons}>
                  {(coupon) => {
                    return <li>{coupon.title} - {coupon.code}</li>
                  }}
                </For>
              </ul>
            </div>

            <div class="w-96">
              <div class="flex justify-between mt-5">
                <strong>Subtotal</strong>
                <span>{formatPrice(subTotal())}</span>
              </div>
              <div class="flex justify-between">
                <strong>Discount</strong>
                <span>-{formatPrice(discounts())}</span>
              </div>
              <div class="flex justify-between">
                <strong>Taxes</strong>
                <span>{formatPrice(0)}</span>
              </div>
              <div class="flex justify-between">
                <strong>Shipping</strong>
                <span>{formatPrice(0)}</span>
              </div>

              <div class="flex justify-between mt-5">
                <strong>Total</strong>
                <span>{formatPrice(finalTotal())}</span>
              </div>
            </div>
          </div>
        </Show>
      </Show>

      <div class="mb-20"></div>
    </>
  )
}

export default Order