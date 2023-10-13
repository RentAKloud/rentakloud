<script lang="ts">
  import { page } from "$app/stores";
  import { Http } from "$lib/http";
  import type { Category, Product } from "$lib/types";
  import { price } from "$lib/utils";
  import { Button, Input, Label, MultiSelect, Textarea } from "flowbite-svelte";

  import { onMount } from "svelte";
  import Editor from "../../../../components/Editor.svelte";

  let product: Product;
  let categories: { value: number; name: string }[] = [];
  let selectedCategories: number[];
  const id = $page.params.id;

  async function loadData() {
    product = await Http.get<Product>(`/products/${id}`);
    categories = (await Http.get<Category[]>(`/categories`)).map((c) => ({
      value: c.id,
      name: c.title,
    }));
    selectedCategories = product.categories
      ? product.categories.map((c) => c.id)
      : [];
  }

  onMount(() => {
    loadData();
  });

  async function update() {
    const data: any = product;
    data.oldCategories = data.categories.map((c: Category) => c.id);
    data.categories = selectedCategories;
    await Http.put(`/products`, data);
  }
</script>

<svelte:head>
  <title>Edit {product?.name || "Product"}</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Editing <em>{product?.name}</em>
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Update product information.
  </p>
</section>

{#if product}
  <form class="p-5 w-2/3" on:submit={update}>
    <div class="mb-6">
      <Label for="name" class="block mb-2">Name</Label>
      <Input id="name" placeholder="Product name" bind:value={product.name} />
    </div>

    <div class="mb-6">
      <Label for="categories" class="block mb-2">Categories</Label>
      {#if categories.length > 0}
        <MultiSelect
          id="categories"
          items={categories}
          bind:value={selectedCategories}
          class="dark:text-white"
        />
      {/if}
    </div>

    <div class="mb-6">
      <Label for="short-description" class="block mb-2">Short Description</Label
      >
      <Textarea
        id="short-description"
        rows="4"
        bind:value={product.shortDescription}
        class="resize-none"
      />
    </div>

    <div class="mb-6">
      <Label for="description" class="block mb-2">Description</Label>
      <Editor />
    </div>

    <div class="mb-6">
      <Label for="price" class="block mb-2">Pricing</Label>
      {#each product.prices as price}
        <div class="flex gap-5 mb-4">
          <Input
            type="number"
            step="0.01"
            placeholder="Price"
            bind:value={price.amount}
          />
          <Input placeholder="Currency" bind:value={price.currency} />
        </div>
      {/each}
    </div>

    <div class="mb-6">
      <Label for="images" class="block mb-2">Images</Label>
      {#each product.images as image}
        <div class="flex gap-5 mb-4">
          <Input placeholder="Source" bind:value={image.src} />
          <Input placeholder="Alt" bind:value={image.alt} />
        </div>
      {/each}
    </div>

    <Button type="submit">Save</Button>
  </form>
{/if}
