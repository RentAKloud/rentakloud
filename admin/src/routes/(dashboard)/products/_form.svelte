<script lang="ts">
  import { Category, Product, ProductType } from "$lib/types";
  import {
    Button,
    Helper,
    Img,
    Input,
    Label,
    Modal,
    MultiSelect,
    Radio,
    Select,
    Textarea,
  } from "flowbite-svelte";
  import { CopySolid, PlusSolid, TrashBinSolid } from "flowbite-svelte-icons";
  import type EditorJS from "@editorjs/editorjs";
  import Editor from "../../../components/Editor.svelte";
  import { onMount } from "svelte";
  import { Http } from "$lib/http";

  export let product: Product;
  export let onSubmit: (data: Product) => Promise<void>;

  let categories: { value: number; name: string }[] = [];
  let selectedCategories: number[];
  let descriptionEditor: EditorJS;

  onMount(async () => {
    const fetchCategories = Http.get<Category[]>(`/categories`);
    categories = (await fetchCategories).result!.map((c) => ({
      value: c.id,
      name: c.title,
    }));
    selectedCategories = product.categories
      ? product.categories.map((c) => c.id)
      : [];
  });

  async function validateFormatAndSubmit() {
    const data: any = { ...product };

    if (data.categories.length > 0) {
      data.oldCategories = data.categories.map((c: Category) => c.id);
    }
    data.categories = selectedCategories;
    data.descriptionEditor = await descriptionEditor.save();

    data.stock = +product.stock;
    data.prices = product.prices.map((p) => {
      const d = { ...p, amount: +p.amount };
      if (p.saleAmount) {
        d.saleAmount = +p.saleAmount;
      }
      return d;
    });

    onSubmit(data);
  }

  let isOnlineService: boolean;
  $: isOnlineService = product.productType === ProductType.OnlineService;
</script>

<form
  class="p-5 flex gap-10 justify-between"
  on:submit={validateFormatAndSubmit}
>
  <section class="w-2/3">
    <div class="mb-6">
      <Label for="name" class="block mb-2">Name</Label>
      <Input id="name" placeholder="Product name" bind:value={product.name} />
    </div>

    <div class="mb-6">
      <Label for="slug" class="block mb-2">Slug</Label>
      <Input id="slug" placeholder="slug" bind:value={product.slug} />

      <Helper id="slug-help" class="mt-2"
        >A unique identifier that's usually used in the URL</Helper
      >
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
      <Editor
        bind:editor={descriptionEditor}
        data={product.descriptionEditor}
      />
    </div>

    <div class="mb-6">
      <div class="flex gap-4 mb-2 items-center">
        <Label for="price" class="block mb-2">Pricing</Label>
        <Button
          pill
          class="!p-2"
          size="sm"
          on:click={() =>
            (product.prices = [
              ...product.prices,
              { currency: "USD", amount: 0, interval: "month" },
            ])}
        >
          <PlusSolid class="dark:text-white" />
        </Button>
      </div>

      {#each product.prices as price, i}
        <div class="flex gap-4 mb-4">
          <div class="flex flex-col gap-2">
            <Button
              outline
              on:click={() =>
                (product.prices = product.prices.filter((p, y) => y !== i))}
            >
              <TrashBinSolid />
            </Button>

            <Button
              outline
              on:click={() => (product.prices = [...product.prices, price])}
            >
              <CopySolid />
            </Button>
          </div>

          <div class="flex flex-col gap-4 mb-4">
            {#if isOnlineService}
              <Input placeholder="Plan name" bind:value={price.planName} />
            {/if}
            <div class="flex gap-4">
              <Input
                type="number"
                step="0.01"
                placeholder="Price"
                bind:value={price.amount}
              />
              <Input
                type="number"
                step="0.01"
                placeholder="Sale Price"
                bind:value={price.saleAmount}
              />
              <Input placeholder="Currency" bind:value={price.currency} />

              {#if isOnlineService}
                <Select
                  items={[
                    { value: "month", name: "Monthly" },
                    { value: "year", name: "Yearly" },
                  ]}
                  bind:value={price.interval}
                />
              {/if}
            </div>

            {#if isOnlineService}
              <div>
                <div class="flex gap-4 items-center mb-2">
                  <Label>Features</Label>
                  <Button
                    pill
                    class="!p-2"
                    size="sm"
                    on:click={() => {
                      if (price.features) {
                        price.features = [...price.features, ""];
                      } else {
                        price.features = [""];
                      }
                    }}
                  >
                    <PlusSolid class="dark:text-white" />
                  </Button>
                </div>

                {#each price.features || [] as feature, j}
                  <div class="flex gap-4">
                    <Input placeholder="Feature" bind:value={feature} />
                    <Button
                      outline
                      on:click={() =>
                        (price.features = (price.features || []).filter(
                          (p, y) => y !== j,
                        ))}
                    >
                      <TrashBinSolid />
                    </Button>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <div class="mb-6">
      <div class="flex gap-4 mb-2 items-center">
        <Label for="images" class="block mb-2">Images</Label>
        <Button
          pill
          class="!p-2"
          size="sm"
          on:click={() =>
            (product.images = [...product.images, { src: "", alt: "" }])}
        >
          <PlusSolid class="dark:text-white" />
        </Button>
      </div>

      {#each product.images as image, i}
        <div class="flex gap-4">
          <div class="flex flex-col gap-2">
            <div class="dark:text-white text-center">
              {i + 1}
            </div>
            <Button
              outline
              on:click={() =>
                (product.images = product.images.filter((img, y) => y !== i))}
            >
              <TrashBinSolid />
            </Button>
          </div>

          <div class="flex flex-col gap-4 mb-8 flex-1">
            <div class="flex gap-4">
              <Input placeholder="Source" bind:value={image.src} />
              <Img
                src={image.src}
                class="w-20"
                alt={image.alt}
                style={image.bg && `background-color: ${image.bg}`}
              />
            </div>
            <Input placeholder="Alt" bind:value={image.alt} />
            <Input type="color" defaultClass="h-14" bind:value={image.bg} />
          </div>
        </div>
      {/each}

      {#if product.images.length === 0}
        <p class="dark:text-white text-sm">No images found.</p>
      {/if}
    </div>

    {#if isOnlineService}
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
    {/if}
  </section>

  <section>
    <div class="sticky top-20">
      <div class="mb-6">
        <Button type="submit">Save</Button>
      </div>

      <div class="mb-6">
        <Label class="block mb-2">Type</Label>

        <Radio
          name="type"
          aria-describedby="type-physical"
          bind:group={product.productType}
          value={ProductType.Physical}>Physical</Radio
        >
        <Helper id="type-physical" class="pl-6"
          >Hardware that ships. One time payment.</Helper
        >

        <Radio
          name="type"
          aria-describedby="type-service"
          bind:group={product.productType}
          value={ProductType.OnlineService}>Online Service</Radio
        >
        <Helper id="type-service" class="pl-6"
          >Subscription based service</Helper
        >
      </div>

      {#if product.productType === ProductType.Physical}
        <div class="mb-6">
          <Label for="stock" class="block mb-2">Stock</Label>
          <Input id="stock" type="number" bind:value={product.stock} />
        </div>

        <div class="mb-6">
          <Label for="weight" class="block mb-2">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            bind:value={product.weight}
            step="0.1"
          />
        </div>
      {/if}
    </div>
  </section>
</form>
