<script lang="ts">
  import type { ProductPrice } from "$lib/types";
  import { Button, Input, Label, Select } from "flowbite-svelte";
  import {
    ArrowDownOutline,
    ArrowUpOutline,
    CopySolid,
    PlusSolid,
    TrashBinSolid,
  } from "flowbite-svelte-icons";

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

    <Button
      outline
      on:click={() => (prices = [...prices, structuredClone(price)])}
    >
      <CopySolid />
    </Button>
  </div>

  <div class="flex flex-col gap-4 mb-4 flex-1">
    {#if isOnlineService}
      <Input placeholder="Plan name" bind:value={price.planName} />

      <div class="flex gap-4 items-center">
        <h3 class="dark:text-white">Prices</h3>
        <Button
          pill
          class="!p-2"
          size="sm"
          on:click={() =>
            (price.prices = [
              ...(price.prices || []),
              {
                currency: "USD",
                amount: 0,
                interval: "month",
                priceId: "",
              },
            ])}
        >
          <PlusSolid class="dark:text-white" />
        </Button>
      </div>
      {#each price.prices || [] as planPrice}
        <div class="flex gap-4">
          <Input
            type="number"
            step="0.01"
            placeholder="Price"
            bind:value={planPrice.amount}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Sale Price"
            bind:value={planPrice.saleAmount}
          />
          <Select
            items={[
              { value: "USD", name: "USD" },
              { value: "CAD", name: "CAD" },
            ]}
            bind:value={planPrice.currency}
          />
        </div>
        <div class="flex gap-4 mb-2">
          <Input placeholder="Price ID" bind:value={planPrice.priceId} />
          <Select
            items={[
              { value: "month", name: "Monthly" },
              { value: "year", name: "Yearly" },
            ]}
            bind:value={planPrice.interval}
          />
        </div>
      {/each}
    {:else}
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
      </div>
    {/if}

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
          <div class="flex gap-4 mb-2 items-center">
            <div class="flex flex-col gap-2">
              <Button size="xs" outline>
                <ArrowUpOutline size="xs" />
              </Button>
              <Button size="xs" outline>
                <ArrowDownOutline size="xs" />
              </Button>
            </div>
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
