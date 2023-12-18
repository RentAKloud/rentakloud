<script lang="ts">
  import { page } from "$app/stores";
  import { Http } from "$lib/http";
  import type { CouponCode } from "$lib/types";
  import { formatDateForDB } from "$lib/utils";

  import { onMount } from "svelte";
  import Form from "../_form.svelte";

  let coupon: CouponCode;
  const id = $page.params.id;
  let errors: { [k in keyof CouponCode]?: string } = {};

  async function loadData() {
    const { result } = await Http.get<CouponCode>(`/coupons/${id}`);
    if (result) {
      coupon = result;
    }
  }

  onMount(() => {
    loadData();
  });

  async function update(data: CouponCode) {
    const { result } = await Http.put<CouponCode>(
      `/coupons/${coupon.id}`,
      data,
    );
    if (result) {
      coupon = result;
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
  <Form {coupon} onSubmit={update} {errors} />
{/if}
