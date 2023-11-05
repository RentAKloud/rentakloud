<script lang="ts">
  import { page } from "$app/stores";
  import { Http } from "$lib/http";
  import { CouponType, type CouponCode } from "$lib/types";
  import { formatDateForDB } from "$lib/utils";
  import { Button, Helper, Input, Label, Radio, Toggle } from "flowbite-svelte";

  import { onMount } from "svelte";

  let coupon: CouponCode;
  const id = $page.params.id;
  let errors: { [k in keyof CouponCode]?: string } = {};

  async function loadData() {
    coupon = await Http.get<CouponCode>(`/coupons/${id}`);
  }

  onMount(() => {
    loadData();
  });

  async function update() {
    errors = {};
    const data: CouponCode = coupon;

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
    data.expiresAt = formatDateForDB(coupon.expiresAt)
    coupon = await Http.put(`/coupons/${coupon.id}`, data);
  }

  $: if (coupon) {
    if (coupon.startsAt) {
      coupon.startsAt = new Date(coupon.startsAt).toISOString().split("Z")[0];
    }
    if (coupon.expiresAt) {
      coupon.expiresAt = new Date(coupon.expiresAt).toISOString().split("Z")[0];
    }
  }
</script>

<svelte:head>
  <title>Edit {coupon?.title || "coupon"}</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Editing <em>{coupon?.title}</em>
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Update Coupon information.
  </p>
</section>

{#if coupon}
  <form class="p-5 w-2/3" on:submit={update}>
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
      <Helper id="type-flat" class="pl-6"
        >For a fixed amount, e.g. $10 off</Helper
      >
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
        <Label for="percentage-discount" class="block mb-2">Flat Discount</Label
        >
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
      <Input
        id="starts-at"
        type="datetime-local"
        bind:value={coupon.startsAt}
      />
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
      <Helper id="max-uses-help" class="mt-2"
        >Leave blank to remove limit</Helper
      >
    </div>

    <Button type="submit">Save</Button>
  </form>
{/if}
