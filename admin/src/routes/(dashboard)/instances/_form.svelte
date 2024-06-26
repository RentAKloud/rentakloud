<script lang="ts">
  import type { Instance } from "$lib/types/instances";
  import { Button, Input, Label, Select } from "flowbite-svelte";

  export let instance: Instance;
  export let onSubmit: (data: Instance) => void;

  function validateFormatAndSubmit() {
    const data: any = instance
    delete data.product
    delete data.productId
    delete data.userId
    onSubmit(data);
  }

  const statusOptions = [
    { value: "Pending", name: "Pending" },
    { value: "Active", name: "Active" },
    { value: "Inactive", name: "Inactive" },
  ];
</script>

<form class="p-5 w-2/3" on:submit={validateFormatAndSubmit}>
  <div class="mb-6">
    <Label for="title" class="block mb-2">Title</Label>
    <Input id="title" placeholder="Title" bind:value={instance.title} />
  </div>

  <div class="mb-6">
    <Label for="status" class="block mb-2">Status</Label>
    <Select items={statusOptions} bind:value={instance.status} />
  </div>

  <div class="mb-6">
    <Label for="vncPath" class="block mb-2">VNC Path</Label>
    <Input id="vncPath" placeholder="/vm1234" bind:value={instance.vncPath} />
  </div>

  <Button type="submit">Submit</Button>
</form>
