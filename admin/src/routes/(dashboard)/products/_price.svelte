<script lang="ts">
  import type { ProductPrice } from "$lib/types";
  import { Button, Input, Label, Select } from "flowbite-svelte";
  import { CopySolid, PlusSolid, TrashBinSolid } from "flowbite-svelte-icons";

  export let prices: ProductPrice[];
  export let price: ProductPrice;
  export let isOnlineService: boolean;
  export let i: number;
</script>

<div class="flex gap-4 mb-4">
  <div class="flex flex-col gap-2">
    <Button
      outline
      on:click={() => (prices = prices.filter((p, y) => y !== i))}
    >
      <TrashBinSolid />
    </Button>

    <Button outline on:click={() => (prices = [...prices, structuredClone(price)])}>
      <CopySolid />
    </Button>
  </div>

  <div class="flex flex-col gap-4 mb-4">
    {#if isOnlineService}
      <Input placeholder="Plan name" bind:value={price.planName} />
    {/if}
    <div class="flex gap-4">
      <Input
        type="number"
        step="0.01"
        placeholder="Price"
        bind:value={price.amount}
      />
      <Input
        type="number"
        step="0.01"
        placeholder="Sale Price"
        bind:value={price.saleAmount}
      />
      <Input placeholder="Currency" bind:value={price.currency} />

      {#if isOnlineService}
        <Select
          items={[
            { value: "month", name: "Monthly" },
            { value: "year", name: "Yearly" },
          ]}
          bind:value={price.interval}
        />
      {/if}
    </div>

    {#if isOnlineService}
      <div>
        <div class="flex gap-4 items-center mb-2">
          <Label>Features</Label>
          <Button
            pill
            class="!p-2"
            size="sm"
            on:click={() => {
              if (price.features) {
                price.features = [...price.features, ""];
              } else {
                price.features = [""];
              }
            }}
          >
            <PlusSolid class="dark:text-white" />
          </Button>
        </div>

        {#each price.features || [] as feature, j}
          <div class="flex gap-4">
            <Input placeholder="Feature" bind:value={feature} />
            <Button
              outline
              on:click={() =>
                (price.features = (price.features || []).filter(
                  (p, y) => y !== j,
                ))}
            >
              <TrashBinSolid />
            </Button>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
