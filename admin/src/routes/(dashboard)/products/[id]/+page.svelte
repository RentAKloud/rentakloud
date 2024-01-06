<script lang="ts">
  import { page } from "$app/stores";
  import { Http } from "$lib/http";
  import type { Category, Product } from "$lib/types";

  import { onMount } from "svelte";

  import Form from "../_form.svelte";

  let product: Product;

  const id = $page.params.id;

  async function loadData() {
    const { result } = await Http.get<Product>(`/products/${id}`);
    if (result) {
      product = result;
    }
  }

  onMount(() => {
    loadData();
  });

  async function update(product: Product) {
    const data: any = product;

    const { result } = await Http.put<Product>(`/products/${product.id}`, data);
    if (result) {
      product = result;
    }
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
  <Form {product} onSubmit={update} />
{/if}
