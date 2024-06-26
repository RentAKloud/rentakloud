<script lang="ts">
  import { Http } from "$lib/http";
  import { User } from "$lib/types/common";
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
  let items: User[] = [];
  $: filteredItems = items.filter(
    (item) =>
      item.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
  );

  async function loadData() {
    const { result } = await Http.get<User[]>("/users");
    if (result) {
      items = result;
    }
  }

  onMount(() => {
    loadData();
  });
</script>

<svelte:head>
  <title>Users</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Users
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage all users here.
  </p>
</section>

<TableSearch hoverable={true} striped bind:inputValue={searchTerm}>
  <TableHead>
    <TableHeadCell class="!p-4">
      <Checkbox />
    </TableHeadCell>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Name</TableHeadCell>
    <TableHeadCell>Email</TableHeadCell>
    <TableHeadCell>Created At</TableHeadCell>
    <TableHeadCell>Updated At</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
    </TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each filteredItems as user}
      <TableBodyRow>
        <TableBodyCell class="!p-4">
          <Checkbox />
        </TableBodyCell>
        <TableBodyCell>{user.id}</TableBodyCell>
        <TableBodyCell>{User.fullName(user)}</TableBodyCell>
        <TableBodyCell>{user.email}</TableBodyCell>
        <TableBodyCell>{user.createdAt}</TableBodyCell>
        <TableBodyCell>{user.updatedAt}</TableBodyCell>
        <TableBodyCell>
          <a
            href="/users/{user.id}"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
          >
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
