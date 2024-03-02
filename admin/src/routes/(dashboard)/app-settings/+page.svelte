<script lang="ts">
  import { Http } from "$lib/http";
  import type { Option } from "$lib/types";
  import { Toggle } from "flowbite-svelte";
  import { onMount } from "svelte";

  let options: any;
  async function loadData() {
    const { result } = await Http.get<Option[]>("/options");
    if (result) {
      result.forEach((o) => {
        options[o.key] = o.value;
      });
    }
  }

  onMount(() => {
    loadData();
  });

  function submit() {
    const _options = Object.keys(options).map((k) => ({ [k]: options[k] }));
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

<section>
  <Toggle class="mb-4" bind:value={options.isStripeTestMode}
    >Stripe Test Mode</Toggle
  >
  <Toggle bind:value={options[""]}>Disable Checkout</Toggle>
</section>
