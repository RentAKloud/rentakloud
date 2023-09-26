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
      name: 'Microsoft Surface Pro',
      color: "White",
      category: "Laptop PC",
      price: 1999,
    },
    {
      id: 3,
      name: 'Magic Mouse 2',
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
  <title>Users</title>
</svelte:head>

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
