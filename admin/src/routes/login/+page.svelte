<script lang="ts">
  import { Http } from "$lib/http";
  import { Button, Label, Input, Checkbox, Card } from "flowbite-svelte";
  import { auth } from "$lib/stores";

  const searchParams = new URLSearchParams(location.search);
  let email: string = searchParams.get("email") || "";
  let password: string = searchParams.get("password") || "";
  let inTransit = false

  async function login(e: SubmitEvent) {
    inTransit = true
    const d = (await Http.post("/auth/login", { email, password })) as {
      access_token: string;
    };

    if (d.access_token) {
      auth.update((a) => {
        a.token = d.access_token;
        return a;
      });
      localStorage.setItem("access_token", d.access_token);
    }
    inTransit = false
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div
  class="min-h-screen flex place-items-center place-content-center bg-cover"
  style="background-image: url(https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);"
>
  <Card class="w-full max-w-md">
    <form class="flex flex-col space-y-6" class:animate-pulse={inTransit} on:submit={login}>
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        Sign in
      </h3>
      <Label class="space-y-2">
        <span>Email</span>
        <Input
          type="email"
          name="email"
          placeholder="name@company.com"
          bind:value={email}
          required
        />
      </Label>
      <Label class="space-y-2">
        <span>Your password</span>
        <Input
          type="password"
          name="password"
          placeholder="•••••"
          bind:value={password}
          required
        />
      </Label>
      <div class="flex items-start">
        <Checkbox>Remember me</Checkbox>
        <a
          href="/"
          class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
        >
          Lost password?
        </a>
      </div>
      <Button type="submit" class="w-full" disabled={inTransit}>Login to your account</Button>
      <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered? <a
          href="/"
          class="text-primary-700 hover:underline dark:text-primary-500"
        >
          Create account
        </a>
      </div> -->
    </form>
  </Card>
</div>
