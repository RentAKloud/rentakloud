<script lang="ts">
  import { Http } from "$lib/http";
  import { Toggle, Button, Input, Label } from "flowbite-svelte";
  import { onMount } from "svelte";

  type AppSettings = {
    isStripeTestMode: boolean;
    disableCheckout: boolean;
    limits: {
      "rak-daas": number;
    };
  };

  let options: AppSettings;
  async function loadData() {
    const { result } = await Http.get<AppSettings>("/options/app-settings");
    if (result) {
      options = result;
    }
  }

  onMount(() => {
    loadData();
  });

  async function submit() {
    options.limits["rak-daas"] = +options.limits["rak-daas"];

    const { error } = await Http.patch("/options/app-settings", options);
    if (error) {
      alert("Couldnt save");
      console.error(error);
    }
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
    <section class="mb-10">
      <Toggle class="mb-4" bind:checked={options.isStripeTestMode}
        >Stripe Test Mode</Toggle
      >
      <Toggle bind:checked={options.disableCheckout}>Disable Checkout</Toggle>
    </section>

    <section class="mb-10 w-1/3">
      <Label class="mb-2">Max RAK DaaS Instances</Label>
      <Input type="number" bind:value={options.limits["rak-daas"]} />
    </section>

    <Button type="submit">Save</Button>
  </form>
{:else}
  <p class="text-gray-500 dark:text-gray-400">No options available right now</p>
{/if}
