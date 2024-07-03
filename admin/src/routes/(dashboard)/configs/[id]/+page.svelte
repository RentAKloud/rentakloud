<script lang="ts">
  import { page } from "$app/stores";
  import { Http } from "$lib/http";
  import { onMount } from "svelte";
  import Form from "../_form.svelte";
  import type { Config } from "$lib/types/instances";

  let config: Config;
  const id = $page.params.id;

  async function loadData() {
    const { result } = await Http.get<Config>(`/configs/${id}`);
    if (result) {
      config = result;
    }
  }

  onMount(() => {
    loadData();
  });

  async function onSubmit(data: Config) {
    const { result } = await Http.put<Config>(`/configs/${config.id}`, data);
    if (result) {
      config = result;
    }
  }
</script>

{#if config}
  <Form {config} {onSubmit} />
{/if}
