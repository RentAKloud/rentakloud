<script lang="ts">
  import { Http } from "$lib/http";
  import type { Product } from "$lib/types";
    import { price } from "$lib/utils";
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
  let items: Product[] = [];
  $: filteredItems = items.filter(
    (item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  async function loadData() {
    const data = await Http.get<Product[]>('/products')
    items = data
  }

  onMount(() => {
    loadData()
  })
</script>

<svelte:head>
  <title>Products</title>
</svelte:head>

<section class="p-5">
  <h1
    class="text-2xl font-semibold text-left text-gray-900 dark:text-white"
  >
    Products
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage products from here.
  </p>
</section>

<TableSearch hoverable={true} striped bind:inputValue={searchTerm}>
  <TableHead>
    <TableHeadCell class="!p-4">
      <Checkbox />
    </TableHeadCell>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Product name</TableHeadCell>
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
        <TableBodyCell>{item.id}</TableBodyCell>
        <TableBodyCell>{item.name}</TableBodyCell>
        <TableBodyCell>{item.categories[0]?.title || "-"}</TableBodyCell>
        <TableBodyCell>{item.prices[0]?.amount ? price(item.prices[0]?.amount) : "-"}</TableBodyCell>
        <TableBodyCell>
          <a
            href={`/products/${item.id}`}
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
          >
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
