<script lang="ts">
  import { page } from "$app/stores";
  import { Http } from "$lib/http";
  import { OrderStatus, type Order } from "$lib/types";
  import {
    formatDateForDB,
    getOrderSubTotal,
    getTotalDiscounts,
    price,
  } from "$lib/utils";
  import {
    Button,
    Card,
    Heading,
    Input,
    Label,
    Select,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";

  import { onMount } from "svelte";
  import BillingInfo from "./BillingInfo.svelte";
  import ShippingInfo from "./ShippingInfo.svelte";

  let order: Order;
  const id = $page.params.id;
  let errors: { [k in keyof Order]?: string } = {};

  async function loadData() {
    const { result } = await Http.get<Order>(`/orders/${id}`);
    if (result) {
      order = result;
    }
  }

  onMount(() => {
    loadData();
  });

  async function update() {
    errors = {};
    const data: Order = order;

    if (data.coupons) {
      delete data.coupons;
    }

    data.createdAt = formatDateForDB(data.createdAt + "Z");

    const { result } = await Http.put<Order>(`/orders/${order.id}`, data);
    if (result) {
      order = result;
    }
  }

  const statusOptions = [
    { value: OrderStatus.Pending, name: "Pending" },
    { value: OrderStatus.OnHold, name: "On Hold" },
    { value: OrderStatus.Paid, name: "Paid" },
    { value: OrderStatus.Shipped, name: "Shipped" },
    { value: OrderStatus.Completed, name: "Completed" },
    { value: OrderStatus.Cancelled, name: "Cancelled" },
  ];

  let editBillingInfo = false;
  let editShippingInfo = false;

  $: if (order?.createdAt) {
    let createdAt = order.createdAt.toString().endsWith("Z")
      ? order.createdAt
      : order.createdAt + "Z";
    order.createdAt = new Date(createdAt).toISOString().split(".")[0];
  }

  const subTotal = () => (order ? getOrderSubTotal(order) : 0);
  const discounts = () =>
    order ? getTotalDiscounts(order.coupons!, subTotal()) : 0;
  const taxes = () =>
    order ? order.taxes!.reduce((curr, next) => curr + next.amount, 0) : 0;
  const finalTotal = () => subTotal() + taxes() - discounts();
</script>

<svelte:head>
  <title>Edit Order #{order?.id || "..."}</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Editing Order <em>#{order?.id}</em>
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Update order status and information.
  </p>
</section>

{#if order}
  <form class="p-5" on:submit={update}>
    <Card size="lg" class="mb-6">
      <p>
        <!-- Payment via Payment method -->
        <!-- {#if order.status === OrderStatus.Paid}
        Paid on {order.paidAt}
        {/if} -->
      </p>
      <div class="flex gap-6">
        <div class="flex flex-col gap-6">
          <div>
            <Label class="mb-2">Created At</Label>
            <Input
              type="datetime-local"
              step="1"
              bind:value={order.createdAt}
            />
          </div>

          <div>
            <Label class="mb-2">Status</Label>
            <Select items={statusOptions} bind:value={order.status} />
          </div>
        </div>

        <div>
          <Heading tag="h6">Billing Details</Heading>
          <BillingInfo editing={editBillingInfo} {order} />
        </div>

        <div>
          <Heading tag="h6">Shipping Details</Heading>
          <ShippingInfo editing={editShippingInfo} {order} />
        </div>
      </div>
    </Card>

    <Card size="lg" class="mb-6">
      <Table>
        <TableHead>
          <TableHeadCell>Sr.</TableHeadCell>
          <TableHeadCell>Product</TableHeadCell>
          <TableHeadCell>Unit Price</TableHeadCell>
          <TableHeadCell>Quantity</TableHeadCell>
          <TableHeadCell>Total</TableHeadCell>
        </TableHead>

        <TableBody>
          {#each order.items as item, i}
            {@const product = item.product}
            {@const _price = product.prices[0]}
            {@const interval = () =>
              _price.priceId
                ? ` &cross; ${_price.planName} ${_price.interval}ly`
                : ""}
            {@const formattedPrice = () =>
              price(_price.saleAmount || _price.amount)}
            {@const formattedTotal = () =>
              price((_price.saleAmount || _price.amount) * item.quantity)}

            <TableBodyRow>
              <TableBodyCell>{i + 1}</TableBodyCell>
              <TableBodyCell
                >{product.name}
                {#if interval()}<span>{interval()}</span>{/if}</TableBodyCell
              >
              <TableBodyCell>{formattedPrice()}</TableBodyCell>
              <TableBodyCell>{item.quantity}</TableBodyCell>
              <TableBodyCell>{formattedTotal()}</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>

      <div class="w-96">
        <div class="flex justify-between mt-5">
          <strong>Subtotal</strong>
          <span>{price(subTotal())}</span>
        </div>
        <div class="flex justify-between">
          <strong>Discount</strong>
          <span>-{price(discounts())}</span>
        </div>
        <div class="flex justify-between">
          <strong>Taxes</strong>
          <span>{price(taxes())}</span>
        </div>
        <div class="flex justify-between">
          <strong>Shipping</strong>
          <span>{price(0)}</span>
        </div>

        <div class="flex justify-between mt-5">
          <strong>Total</strong>
          <span>{price(finalTotal())}</span>
        </div>
      </div>

      <div>
        <h4 class="font-bold mb-2">Notes</h4>
        <p>{order.notes}</p>
      </div>
    </Card>

    <Button type="submit">Save</Button>
  </form>
{/if}
