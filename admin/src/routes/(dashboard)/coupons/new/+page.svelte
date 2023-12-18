<script lang="ts">
  import { Http } from "$lib/http";
  import { defaultCouponCode, type CouponCode } from "$lib/types";
  import { onMount } from "svelte";

  import Form from "../_form.svelte";
  import { goto } from "$app/navigation";

  let coupon: CouponCode;
  let errors: { [k in keyof CouponCode]?: string } = {};

  onMount(() => {
    coupon = defaultCouponCode;
  });

  async function create(data: CouponCode) {
    const { result } = await Http.post<CouponCode>(`/coupons`, data);
    if (result) {
      goto("/coupons");
    }
  }
</script>

<svelte:head>
  <title>Edit {coupon?.title || "coupon"}</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Create New Coupon
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Create a new coupon from here.
  </p>
</section>

{#if coupon}
  <Form {coupon} onSubmit={create} {errors} />
{/if}
