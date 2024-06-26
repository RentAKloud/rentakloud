<script lang="ts">
  import { Http } from "$lib/http";
  import type { Category } from "$lib/types/common";
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
  import { onMount } from "svelte";

  let searchTerm = "";
  let items: Category[] = [];
  $: filteredItems = items.filter(
    (item) => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
  );

  async function loadData() {
    const { result } = await Http.get<Category[]>("/categories");
    if (result) {
      items = result;
    }
  }

  onMount(() => {
    loadData();
  });
</script>

<svelte:head>
  <title>Categories</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Categories
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage product categories from here.
  </p>

  <div class="mt-4">
    <Button href="/categories/new">New</Button>
  </div>
</section>

<TableSearch hoverable={true} striped bind:inputValue={searchTerm}>
  <TableHead>
    <TableHeadCell class="!p-4">
      <Checkbox />
    </TableHeadCell>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Title</TableHeadCell>
    <TableHeadCell>Slug</TableHeadCell>
    <TableHeadCell>Product Count</TableHeadCell>
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
        <TableBodyCell>{item.title}</TableBodyCell>
        <TableBodyCell>{item.slug}</TableBodyCell>
        <TableBodyCell>-</TableBodyCell>
        <TableBodyCell>
          <a
            href={`/categories/${item.id}`}
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
          >
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
