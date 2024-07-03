<script lang="ts">
    import type { Config } from "$lib/types/instances";
  import { Button, Input, Label } from "flowbite-svelte";

  export let config: Config;
  export let onSubmit: (data: Config) => void;

  function validateFormatAndSubmit() {
    onSubmit(config)
  }
</script>

<form class="p-5 w-2/3" on:submit={validateFormatAndSubmit}>
  <div class="mb-6">
    <Label for="id" class="block mb-2">ID</Label>
    <Input id="id" placeholder="ID" bind:value={config.id} disabled />
  </div>

  <div class="mb-6">
    <Label for="cpus" class="block mb-2">CPUs</Label>
    <Input id="cpus" placeholder="CPUs" bind:value={config.cpus} />
  </div>

  <div class="mb-6">
    <Label for="ram" class="block mb-2">RAM</Label>
    <Input id="ram" placeholder="RAM" bind:value={config.ram} />
  </div>

  <div class="mb-6">
    <Label for="ssd" class="block mb-2">SSD</Label>
    <Input id="ssd" placeholder="SSD" bind:value={config.ssd} />
  </div>

  <div class="mb-6">
    <Label for="hdd" class="block mb-2">HDD</Label>
    <Input id="hdd" placeholder="HDD" bind:value={config.hdd} />
  </div>

  <Button type="submit">Submit</Button>
</form>
