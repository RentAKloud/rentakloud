<script>
  import {
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Checkbox,
    TableSearch,
  } from "flowbite-svelte";

  let searchTerm = "";
  let items = [
    {
      id: 1,
      name: 'Apple MacBook Pro 17"',
      color: "Silver",
      category: "Laptop",
      price: 2999,
    },
    {
      id: 2,
      name: "Microsoft Surface Pro",
      color: "White",
      category: "Laptop PC",
      price: 1999,
    },
    {
      id: 3,
      name: "Magic Mouse 2",
      color: "Black",
      category: "Accessories",
      price: 99,
    },
    {
      id: 4,
      name: 'Apple MacBook Pro 13"',
      color: "Rose",
      category: "Laptop",
      price: 2599,
    },
  ];
  $: filteredItems = items.filter(
    (item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );
</script>

<svelte:head>
  <title>Orders</title>
</svelte:head>

<section class="p-5">
  <h1
    class="text-2xl font-semibold text-left text-gray-900 dark:text-white"
  >
    Orders
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage orders from here. Updating the status of orders will notify the customers.
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
        <TableBodyCell>{item.name}</TableBodyCell>
        <TableBodyCell>{item.color}</TableBodyCell>
        <TableBodyCell>{item.category}</TableBodyCell>
        <TableBodyCell>${item.price}</TableBodyCell>
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
