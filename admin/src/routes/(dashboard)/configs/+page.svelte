<script lang="ts">
  import { Http } from "$lib/http";
  import type { Config, Instance } from "$lib/types";
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
  let items: Config[] = [];
  $: filteredItems = items.filter(
    (item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
  );

  async function loadData() {
    const { result } = await Http.get<{ data: Config[] }>("/configs");
    if (result) {
      items = result.data;
    }
  }

  async function deleteConfig(id: number) {
    const { result } = await Http.delete(`/configs/${id}`);

    if (result) {
      loadData();
    }
  }

  onMount(() => {
    loadData();
  });
</script>

<svelte:head>
  <title>Configs</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Configs
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage VM configurations from here.
  </p>

  <div class="mt-4">
    <Button href="/instances/new">New</Button>
  </div>
</section>

<TableSearch hoverable={true} striped bind:inputValue={searchTerm}>
  <TableHead>
    <TableHeadCell class="!p-4">
      <Checkbox />
    </TableHeadCell>
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Name</TableHeadCell>
    <TableHeadCell>CPUs</TableHeadCell>
    <TableHeadCell>RAM</TableHeadCell>
    <TableHeadCell>SSD</TableHeadCell>
    <TableHeadCell>HDD</TableHeadCell>
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
        <TableBodyCell>{item.cpus}</TableBodyCell>
        <TableBodyCell>{item.ram}</TableBodyCell>
        <TableBodyCell>{item.ssd}</TableBodyCell>
        <TableBodyCell>{item.hdd}</TableBodyCell>
        <TableBodyCell tdClass="flex gap-4 items-center py-4">
          <a
            href={`/instances/${item.id}`}
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
          >
          <Button
            size="xs"
            outline
            on:click={() => item.id && deleteConfig(item.id)}
          >
            <TrashBinSolid />
          </Button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
