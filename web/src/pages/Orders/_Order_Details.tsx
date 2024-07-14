import { Component, For, Show } from "solid-js";
import { getPlanPrice, getProductPrice } from "~/stores/products";
import { Order, OrderItem } from "~/types/order";
import { formatPrice } from "~/utils";

const OrderDetails: Component<{ order: Order }> = (props) => {
  return (
    <table class="table mb-2">
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
        <For each={props.order.items} fallback={"This order seems empty."}>
          {(item, i) => {
            const product = item.product;
            const { interval, formattedPrice, formattedTotal } =
              orderItemDisplayData(item);

            return (
              <tr>
                <td>{i() + 1}</td>
                <td>
                  {product.name}{" "}
                  <Show when={interval}>
                    <span innerHTML={interval} />
                  </Show>
                </td>
                <td>{formattedPrice}</td>
                <td>{item.quantity}</td>
                <td>{formattedTotal}</td>
              </tr>
            );
          }}
        </For>
      </tbody>
    </table>
  );
};

export function orderItemDisplayData(item: OrderItem) {
  const price = () => getProductPrice(item.product);
  const planPrice = item.priceId ? getPlanPrice(price(), item.priceId) : null;
  const interval = planPrice
    ? ` - ${price().planName} ${planPrice.interval}ly`
    : "";
  const formattedPrice = formatPrice(
    price().saleAmount || price().amount || planPrice!.amount,
  );
  const formattedTotal = formatPrice(
    (price().saleAmount || price().amount || planPrice!.amount) * item.quantity,
  );
  return {
    interval,
    formattedPrice,
    formattedTotal,
  };
}

export default OrderDetails;
