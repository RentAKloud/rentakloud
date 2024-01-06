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
    Button,
  } from "flowbite-svelte";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  let searchTerm = "";
  let items: Product[] = [];
  $: filteredItems = items.filter(
    (item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
  );

  async function loadData() {
    const { result } = await Http.get<Product[]>("/products");
    if (result) {
      items = result;
    }
  }

  async function deleteProduct(id: number) {
    const { result } = await Http.delete(`/products/${id}`);

    if (result) {
      loadData()
    }
  }

  onMount(() => {
    loadData();
  });
</script>

<svelte:head>
  <title>Products</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Products
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage products from here.
  </p>

  <div class="mt-4">
    <Button href="/products/new">New</Button>
  </div>
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
        <TableBodyCell
          >{item.prices[0]?.amount
            ? price(item.prices[0]?.amount)
            : "-"}</TableBodyCell
        >
        <TableBodyCell tdClass="flex gap-4 items-center py-4">
          <a
            href={`/products/${item.id}`}
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
          >
          <Button size="xs" outline on:click={() => item.id && deleteProduct(item.id)}>
            <TrashBinSolid />
          </Button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
