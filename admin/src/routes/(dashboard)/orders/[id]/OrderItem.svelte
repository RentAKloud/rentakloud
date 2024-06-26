<script lang="ts">
  import type { OrderItem } from "$lib/types/common";
  import { getPlanPrice, getProductPrice, price } from "$lib/utils";
  import { TableBodyCell, TableBodyRow } from "flowbite-svelte";
  export let item: OrderItem;
  export let i: number;

  const _priceObj = getProductPrice(item.product);
  const planPrice = item.priceId ? getPlanPrice(_priceObj, item.priceId) : null;
  const interval = planPrice
    ? ` - ${_priceObj.planName} ${planPrice.interval}ly`
    : "";
  const _price = _priceObj.saleAmount || _priceObj.amount || planPrice!.amount;
  const formattedPrice = price(_price);
  const formattedTotal = price(_price * item.quantity);
</script>

<TableBodyRow>
  <TableBodyCell>{i + 1}</TableBodyCell>
  <TableBodyCell
    >{item.product.name}
    {#if interval}<span>{interval}</span>{/if}</TableBodyCell
  >
  <TableBodyCell>{formattedPrice}</TableBodyCell>
  <TableBodyCell>{item.quantity}</TableBodyCell>
  <TableBodyCell>{formattedTotal}</TableBodyCell>
</TableBodyRow>
