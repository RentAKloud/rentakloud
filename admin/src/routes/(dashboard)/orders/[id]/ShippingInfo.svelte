<script lang="ts">
  import type { Order } from "$lib/types";
  import { Input, Label } from "flowbite-svelte";

  export let order: Order;
  export let editing: boolean;
</script>

{#if editing}
  <div class="mb-6">
    <Label for="shipping-first-name" class="block mb-2">Shipping First Name</Label>
    <Input
      id="shipping-first-name"
      placeholder="Shipping First Name"
      bind:value={order.shippingFirstName}
    />
  </div>
{:else}
  <p>
    {order.shippingFirstName}
    {order.shippingLastName}<br />
    {order.shippingAddress}<br />
    {order.shippingAddress2}{#if order.shippingAddress2}<br />{/if}
    {order.shippingCity}<br />
    {order.shippingState}, {order.shippingZip}<br />
    {order.shippingCountry}
  </p>
{/if}
