<script lang="ts">
  import { Http } from "$lib/http";
  import { Toggle } from "flowbite-svelte";
  import { onMount } from "svelte";

  let data;
  async function loadData() {
    const { result } = await Http.get<{ key: string; value: string }>("/options");
    if (result) {
      data = result;
    }
  }

  onMount(() => {
    loadData();
  });
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
  <Toggle>Stripe Test Mode</Toggle>
</section>
