<script lang="ts">
  import { Http } from "$lib/http";
  import type { Option } from "$lib/types/common";
  import { Toggle, Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  let options: any;
  async function loadData() {
    const { result } = await Http.get<Option[]>("/options/app-settings");
    if (result) {
      options = result;
    }
  }

  onMount(() => {
    loadData();
  });

  async function submit() {
    const { result } = await Http.patch("/options/app-settings", options);
    console.log(result);
  }
</script>

<svelte:head>
  <title>App Settings</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    App Settings
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Manage site wide configurations from here.
  </p>
</section>

{#if options}
  <form on:submit={submit}>
    <section class="mb-4">
      <Toggle class="mb-4" bind:checked={options.isStripeTestMode}
        >Stripe Test Mode</Toggle
      >
      <Toggle bind:checked={options.disableCheckout}>Disable Checkout</Toggle>
    </section>

    <Button type="submit">Save</Button>
  </form>
{:else}
  <p class="text-gray-500 dark:text-gray-400">No options available right now</p>
{/if}
