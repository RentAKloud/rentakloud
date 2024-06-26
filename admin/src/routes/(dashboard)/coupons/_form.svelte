<script lang="ts">
  import { Http } from "$lib/http";
  import { CouponType, type CouponCode, Product, ProductType, type CreateCouponCode } from "$lib/types/common";
  import { formatDateForDB } from "$lib/utils";
  import {
    Button,
    Helper,
    Input,
    Label,
    MultiSelect,
    Radio,
    Toggle,
  } from "flowbite-svelte";
  import { onMount } from "svelte";

  export let coupon: CouponCode;
  export let onSubmit: (data: CreateCouponCode) => void;
  export let errors: { [k in keyof CouponCode]?: string };
  let products: Product[];
  let selectedProducts: number[] = [];

  onMount(async () => {
    const { result } = await Http.get<Product[]>(
      `/products?productType=${ProductType.Physical}`,
    );
    if (result) {
      products = result;
      selectedProducts = coupon.products.map(p => p.id)
    }
  });

  function validateFormatAndSubmit() {
    errors = {};
    const temp: any = coupon
    // if new, oldProducts don't exist
    if (coupon.id) {
      temp.oldProducts = coupon.products.map(p => p.id)
    }
    temp.products = selectedProducts
  
    const data: CreateCouponCode = temp;

    if (data.type === CouponType.Percentage) {
      data.percentageDiscount = +data.percentageDiscount;
    }

    const de = new Date(coupon.expiresAt!);
    const ds = new Date(coupon.startsAt!);
    if (coupon.expiresAt && de <= ds) {
      errors.expiresAt = "Expires At must be after Starts At";
      return;
    }

    if (data.maxUses) {
      data.maxUses = +coupon.maxUses!;
    }
    data.startsAt = formatDateForDB(coupon.startsAt);
    data.expiresAt = formatDateForDB(coupon.expiresAt);

    onSubmit(data);
  }

  $: if (coupon) {
    if (coupon.startsAt) {
      coupon.startsAt = new Date(coupon.startsAt).toLocaleISOString();
    }
    if (coupon.expiresAt) {
      coupon.expiresAt = new Date(coupon.expiresAt).toLocaleISOString();
    }
  }
</script>

<form class="p-5 w-2/3" on:submit={validateFormatAndSubmit}>
  <div class="mb-6">
    <Label for="name" class="block mb-2">Name</Label>
    <Input id="name" placeholder="Coupon name" bind:value={coupon.title} />
  </div>

  <div class="mb-6">
    <Label for="code" class="block mb-2">Code</Label>
    <Input id="code" placeholder="Code" bind:value={coupon.code} />
  </div>

  <div class="mb-6">
    <Label for="active" class="block mb-2">Is Active/Enabled?</Label>
    <Toggle id="active" bind:checked={coupon.active} />
  </div>

  <div class="mb-6">
    <Label for="is-private" class="block mb-2">Is Private?</Label>
    <Toggle id="is-private" bind:checked={coupon.isPrivate} />
    <Helper id="is-private-help" class="pl-6">Private coupons don't get autofilled on checkout.</Helper>
  </div>

  <div class="mb-6">
    <Label class="block mb-2">Type</Label>

    <Radio
      name="type"
      aria-describedby="type-percentage"
      bind:group={coupon.type}
      value={CouponType.Percentage}>Percentage</Radio
    >
    <Helper id="type-percentage" class="pl-6">e.g. 10% or 50% off</Helper>

    <Radio
      name="type"
      aria-describedby="type-flat"
      bind:group={coupon.type}
      value={CouponType.Flat}>Flat</Radio
    >
    <Helper id="type-flat" class="pl-6">For a fixed amount, e.g. $10 off</Helper>
  </div>

  {#if coupon.type === CouponType.Percentage}
    <div class="mb-6">
      <Label for="percentage-discount" class="block mb-2"
        >Percentage Discount</Label
      >
      <Input
        id="percentage-discount"
        type="number"
        placeholder="10%"
        bind:value={coupon.percentageDiscount}
      />
    </div>
  {:else if coupon.type === CouponType.Flat}
    <div class="mb-6">
      <Label for="percentage-discount" class="block mb-2">Flat Discount</Label>
      <Input
        id="percentage-discount"
        type="number"
        placeholder="10%"
        bind:value={coupon.flatDiscount}
      />
    </div>
  {/if}

  <div class="mb-6">
    <Label for="starts-at" class="block mb-2">Starts At</Label>
    <Input id="starts-at" type="datetime-local" bind:value={coupon.startsAt} />
  </div>

  <div class="mb-6">
    <Label for="expires-at" class="block mb-2">Expires At</Label>
    <Input
      id="expires-at"
      type="datetime-local"
      bind:value={coupon.expiresAt}
    />
    {#if errors.expiresAt}
      <Helper class="mt-2" color="red">
        <span class="font-medium">Oh, snapp!</span>
        {errors.expiresAt}
      </Helper>
    {/if}
  </div>

  <div class="mb-6">
    <Label for="max-uses" class="block mb-2">Max Uses</Label>
    <Input
      id="max-uses"
      type="number"
      bind:value={coupon.maxUses}
      aria-describedby="max-uses-help"
    />
    <Helper id="max-uses-help" class="mt-2">Leave blank to remove limit</Helper>
  </div>

  {#if products}
    <div class="mb-6">
      <Label for="limit-to" class="block mb-2">Limit To</Label>
      <MultiSelect
        items={products.map((p) => ({ value: p.id, name: p.name }))}
        bind:value={selectedProducts}
        size="lg"
      />
      <Helper id="limit-to-help" class="mt-2"
        >Limit usage to specific products.</Helper
      >
    </div>
  {/if}

  <Button type="submit">Save</Button>
</form>
