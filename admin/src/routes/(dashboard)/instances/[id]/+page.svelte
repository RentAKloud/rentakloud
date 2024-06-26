<script lang="ts">
  import { page } from "$app/stores";
  import { Http } from "$lib/http";
  import { onMount } from "svelte";
  import Form from "../_form.svelte";
  import type { Instance } from "$lib/types/instances";

  let instance: Instance;
  const id = $page.params.id;

  async function loadData() {
    const { result } = await Http.get<Instance>(`/instances/${id}`);
    if (result) {
      instance = result;
    }
  }

  onMount(() => {
    loadData();
  });

  async function onSubmit(data: Instance) {
    const { result } = await Http.patch<Instance>(
      `/instances/${instance.id}`,
      data,
    );
    if (result) {
      instance = result;
    }
  }
</script>

{#if instance}
  <Form {instance} {onSubmit} />
{/if}
