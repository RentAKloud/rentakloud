<script lang="ts">
  import type { Product } from "$lib/types";
  import { Input, Label } from "flowbite-svelte";

  export let product: Product;
</script>

<div class="mb-6">
  <Label for="page-title" class="block mb-2">Page Title</Label>
  <Input
    id="page-title"
    placeholder="Page Title"
    bind:value={product.meta.pageTitle}
  />
</div>

<div class="mb-6">
  <Label for="header-title" class="block mb-2">Header Title</Label>
  <Input
    id="header-title"
    placeholder="Header Title"
    bind:value={product.meta.headerTitle}
  />
</div>

<div class="mb-6">
  <Label for="header-subtitle" class="block mb-2">Header Subtitle</Label>
  <Input
    id="header-subtitle"
    placeholder="Header Title"
    bind:value={product.meta.headerSubtitle}
  />
</div>

<div class="mb-6">
  <Label for="2nd-section-title" class="block mb-2">2nd Section Title</Label>
  <Input
    id="2nd-section-title"
    placeholder="Title"
    bind:value={product.meta.secondSecTitle}
  />
</div>

<div class="mb-6">
  <Label for="2nd-section-content" class="block mb-2">2nd Section Content</Label
  >
  <Input
    id="2nd-section-content"
    placeholder="Title"
    bind:value={product.meta.secondSecContent}
  />
</div>
