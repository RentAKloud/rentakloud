<script lang="ts">
  import type { Category } from "$lib/types/common";
  import { Button, Input, Label } from "flowbite-svelte";

  export let category: Category;
  export let onSubmit: (data: Category) => void;

  function validateFormatAndSubmit() {
    onSubmit(category)
  }
</script>

<form class="p-5 w-2/3" on:submit={validateFormatAndSubmit}>
  <div class="mb-6">
    <Label for="slug" class="block mb-2">Slug</Label>
    <Input id="slug" placeholder="slug" bind:value={category.slug} />
  </div>

  <div class="mb-6">
    <Label for="title" class="block mb-2">Title</Label>
    <Input id="title" placeholder="Title" bind:value={category.title} />
  </div>

  <Button type="submit">Submit</Button>
</form>
