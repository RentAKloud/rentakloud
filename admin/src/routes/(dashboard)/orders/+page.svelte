<script lang="ts">
    import { Http } from "$lib/http";
  import { Order } from "$lib/types";
  import {
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
    TableSearch,
  } from "flowbite-svelte";
    import { onMount } from "svelte";

  let searchTerm = "";
  let items: Order[] = [];
  $: filteredItems = items.filter(
    (item) => Order.searchStr(item).toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  async function loadData() {
    const data = await Http.get<Order[]>("/orders");
    items = data;
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
    <TableHeadCell>Product name</TableHeadCell>
    <TableHeadCell>Color</TableHeadCell>
    <TableHeadCell>Category</TableHeadCell>
    <TableHeadCell>Price</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
    </TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each filteredItems as item}
      <TableBodyRow>
        <TableBodyCell class="!p-4">
          <Checkbox />
        </TableBodyCell>
        <TableBodyCell>{item.billingEmail}</TableBodyCell>
        <TableBodyCell>{item.billingFirstName} {item.billingLastName}</TableBodyCell>
        <TableBodyCell>{item.items.length}</TableBodyCell>
        <TableBodyCell>${item.createdAt}</TableBodyCell>
        <TableBodyCell>
          <a
            href="/tables"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
          >
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
