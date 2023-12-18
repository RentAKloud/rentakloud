<script lang="ts">
  import { page } from "$app/stores";
  import { Http } from "$lib/http";
  import type { User } from "$lib/types";
  import { formatDateForDB } from "$lib/utils";
  import { Input, Label } from "flowbite-svelte";

  import { onMount } from "svelte";

  let user: User;
  const id = $page.params.id;
  let errors: { [k in keyof User]?: string } = {};

  async function loadData() {
    const { result } = await Http.get<User>(`/users/${id}`);
    if (result) {
      user = result;
    }
  }

  onMount(() => {
    loadData();
  });

  async function update() {
    errors = {};
    const data: User = user;

    const { result } = await Http.put<User>(`/users/${user.id}`, data);
    if (result) {
      user = result;
    }
  }
</script>

<svelte:head>
  <title>Edit User #{user?.id || "..."}</title>
</svelte:head>

<section class="p-5">
  <h1 class="text-2xl font-semibold text-left text-gray-900 dark:text-white">
    Editing User <em>#{user?.id}</em>
  </h1>
  <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
    Update user status and information.
  </p>
</section>

{#if user}
  <form class="p-5 w-2/3" on:submit={update}>
    <div class="mb-6">
      <Label for="first-name" class="block mb-2">First Name</Label>
      <Input id="first-name" placeholder="John" bind:value={user.firstName} />
    </div>

    <div class="mb-6">
      <Label for="last-name" class="block mb-2">Last Name</Label>
      <Input id="last-name" placeholder="Doe" bind:value={user.lastName} />
    </div>
  </form>
{/if}
