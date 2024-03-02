<script lang="ts">
  import { page } from "$app/stores";
  import { Http } from "$lib/http";
  import type { Category } from "$lib/types";
  import { onMount } from "svelte";
  import Form from "../_form.svelte";

  let category: Category;
  const id = $page.params.id;

  async function loadData() {
    const { result } = await Http.get<Category>(`/categories/${id}`);
    if (result) {
      category = result;
    }
  }

  onMount(() => {
    loadData();
  });

  async function onSubmit(data: Category) {
    const { result } = await Http.put<Category>(
      `/categories/${category.id}`,
      data,
    );
    if (result) {
      category = result;
    }
  }
</script>

{#if category}
  <Form {category} {onSubmit} />
{/if}
