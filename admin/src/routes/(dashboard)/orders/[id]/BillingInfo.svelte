<script lang="ts">
  import type { Order } from "$lib/types";
  import { Input, Label } from "flowbite-svelte";

  export let order: Order;
  export let editing: boolean;
</script>

{#if editing}
  <div class="mb-6">
    <Label for="billing-email" class="block mb-2">Billing Email</Label>
    <Input
      id="billing-email"
      placeholder="Billing Email"
      bind:value={order.billingEmail}
    />
  </div>
{:else}
  <p>
    {order.billingFirstName}
    {order.billingLastName}<br />
    {order.billingAddress}<br />
    {order.billingAddress2}{#if order.billingAddress2}<br />{/if}
    {order.billingCity}<br />
    {order.billingState}, {order.billingZip}<br />
    {order.billingCountry}
  </p>
{/if}
