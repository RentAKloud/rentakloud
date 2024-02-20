import { Component, For, Show, createResource } from "solid-js";
import { Link, useParams } from "@solidjs/router";
import OrdersApi from "~/api/orders";
import Loader from "~/components/Loader";
import { DateTime } from "~/components/DateTime";
import { formatPrice, getOrderSubTotal, getTotalDiscounts } from "~/utils";
import { OrderStatus } from "~/types/order";
import { getPlanPrice } from "~/stores/products";
import OrderDetails from "./_Order_Details";

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
  const discounts = () => order() ? getTotalDiscounts(
    order()!.coupons,
    subTotal(),
    order()!.items.map(i => ({
      id: i.product.id,
      price: i.product.prices[0].amount,
      qty: i.quantity
    }))
  ) : 0
  const shipping = () => order() ? +order()!.shipping.amount : 0
  const taxes = () => order() ? order()!.taxes.reduce((curr, next) => curr + +next.amount, 0) : 0
  const finalTotal = () => subTotal() + shipping() + taxes() - discounts()

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Order #{order()?.id || ''} Details</h2>

      <Show when={order.loading}>
        <Loader />
      </Show>

      <Show when={order()}>
        <div class="flex justify-between mb-8">
          <h3 class="text-2xl"><DateTime value={order()!.createdAt} /></h3>
          <div>
            <h4
              class="text-xl"
              classList={{
                "text-green-500": [OrderStatus.Paid, OrderStatus.Completed].includes(order()!.status),
                "text-yellow-500": [OrderStatus.Pending, OrderStatus.OnHold].includes(order()!.status),
                "text-red-500": [OrderStatus.Cancelled].includes(order()!.status)
              }}
            >{order()!.status}</h4>
            <Show when={order()!.status === OrderStatus.Pending}>
              <Link href={`/checkout?order=${order()!.id}`}><span class="link link-hover">Continue checkout</span> &rarr;</Link>
            </Show>
          </div>
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
              {order()!.billingEmail}<br />
              {order()!.billingPhone}
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

        <OrderDetails order={order()!} />

        <div class="mb-16" />

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
              <span>{formatPrice(taxes())}</span>
            </div>
            <div class="flex justify-between">
              <strong>Shipping</strong>
              <span>{formatPrice(shipping())}</span>
            </div>

            <div class="flex justify-between mt-5">
              <strong>Total</strong>
              <span>{formatPrice(finalTotal())}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-bold mb-2">Notes</h4>
          <p>{order()!.notes}</p>
        </div>
      </Show>

      <div class="mb-20"></div>
    </>
  )
}

export default Order