<script lang="ts">
  import { Http } from "$lib/http";
  import { Order, OrderStatus } from "$lib/types";
  import {
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
    TableSearch,
    A,
  } from "flowbite-svelte";
  import { onMount } from "svelte";

  let searchTerm = "";
  let items: Order[] = [];
  $: filteredItems = items.filter(
    (item) =>
      Order.searchStr(item).toLowerCase().indexOf(searchTerm.toLowerCase()) !==
      -1,
  );

  async function loadData() {
    const { result } = await Http.get<Order[]>("/orders");
    if (result) {
      items = result;
    }
  }

  onMount(() => {
    loadData();
  });
</script>

<svelte:head>
  <title>Orders</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Orders
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage orders from here. Updating the status of orders will notify the
    customers.
  </p>
</section>

<TableSearch hoverable={true} striped bind:inputValue={searchTerm}>
  <TableHead>
    <TableHeadCell class="!p-4">
      <Checkbox />
    </TableHeadCell>
    <TableHeadCell>Order ID</TableHeadCell>
    <TableHeadCell>User ID</TableHeadCell>
    <TableHeadCell># of Items</TableHeadCell>
    <TableHeadCell>Total</TableHeadCell>
    <TableHeadCell>Status</TableHeadCell>
    <TableBodyCell>Created At</TableBodyCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
    </TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each filteredItems as order}
      <TableBodyRow>
        <TableBodyCell class="!p-4">
          <Checkbox />
        </TableBodyCell>
        <TableBodyCell>{order.id}</TableBodyCell>
        <TableBodyCell>
          <A href="/users/{order.userId}">{order.userId}</A>
        </TableBodyCell>
        <TableBodyCell>{order.items.length}</TableBodyCell>
        <TableBodyCell>${order.amount}</TableBodyCell>
        <TableBodyCell
          tdClass={order.status === OrderStatus.Paid ? "text-green-500" : ""}
          >{order.status}</TableBodyCell
        >
        <TableBodyCell>{order.createdAt}</TableBodyCell>
        <TableBodyCell>
          <a
            href="/orders/{order.id}"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
          >
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
