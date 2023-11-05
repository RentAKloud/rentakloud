<script lang="ts">
  import { Http } from "$lib/http";
  import { CouponType, type CouponCode } from "$lib/types";
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
  let items: CouponCode[] = [];
  $: filteredItems = items.filter(
    (item) => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  async function loadData() {
    const data = await Http.get<CouponCode[]>('/coupons')
    items = data
  }

  onMount(() => {
    loadData()
  })
</script>

<svelte:head>
  <title>Coupon Codes</title>
</svelte:head>

<section class="p-5">
  <h1
    class="text-2xl font-semibold text-left text-gray-900 dark:text-white"
  >
    Coupon Codes
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage coupon codes from here.
  </p>
</section>

<TableSearch hoverable={true} striped bind:inputValue={searchTerm}>
  <TableHead>
    <TableHeadCell class="!p-4">
      <Checkbox />
    </TableHeadCell>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Title</TableHeadCell>
    <TableHeadCell>Code</TableHeadCell>
    <TableHeadCell>Type</TableHeadCell>
    <TableHeadCell>Discount</TableHeadCell>
    <TableHeadCell>Created At</TableHeadCell>
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
        <TableBodyCell>{item.code}</TableBodyCell>
        <TableBodyCell>{item.type}</TableBodyCell>
        <TableBodyCell>{item.type === CouponType.Flat ? item.flatDiscount: item.percentageDiscount + '%'}</TableBodyCell>
        <TableBodyCell>
          <a
            href={`/coupons/${item.id}`}
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
          >
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
