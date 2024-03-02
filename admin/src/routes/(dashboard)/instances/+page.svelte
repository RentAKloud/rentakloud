<script lang="ts">
  import { Http } from "$lib/http";
  import type { Instance } from "$lib/types";
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
  let items: Instance[] = [];
  $: filteredItems = items.filter(
    (item) => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
  );

  async function loadData() {
    const { result } = await Http.get<Instance[]>("/instances");
    if (result) {
      items = result;
    }
  }

  async function deleteInstance(id: string) {
    const { result } = await Http.delete(`/instances/${id}`);

    if (result) {
      loadData();
    }
  }

  onMount(() => {
    loadData();
  });
</script>

<svelte:head>
  <title>Instances</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Instances
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage VM instances from here.
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
    <TableHeadCell>Display name</TableHeadCell>
    <TableHeadCell>Status</TableHeadCell>
    <TableHeadCell>VNC Path</TableHeadCell>
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
        <TableBodyCell>{item.status}</TableBodyCell>
        <TableBodyCell>{item.vncPath}</TableBodyCell>
        <TableBodyCell tdClass="flex gap-4 items-center py-4">
          <a
            href={`/instances/${item.id}`}
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Edit</a
          >
          <Button
            size="xs"
            outline
            on:click={() => item.id && deleteInstance(item.id)}
          >
            <TrashBinSolid />
          </Button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
