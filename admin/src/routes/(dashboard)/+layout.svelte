<script>
  import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
    SidebarDropdownItem,
    SidebarDropdownWrapper,
  } from "flowbite-svelte";
  import {
    ChartPieSolid,
    GridSolid,
    ShoppingCartSolid,
    MailBoxSolid,
    UserSolid,
    GearSolid,
  } from "flowbite-svelte-icons";
    import { auth } from "$lib/stores";
    import { goto } from "$app/navigation";
  let spanClass = "flex-1 ml-3 whitespace-nowrap";

  auth.subscribe(async (value) => {
    if (!value.isLoggedIn()) {
      goto("/login")
    }
  })
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<main class="flex">
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Dashboard" href="/">
          <svelte:fragment slot="icon">
            <ChartPieSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarDropdownWrapper label="E-commerce">
          <svelte:fragment slot="icon">
            <ShoppingCartSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          <SidebarDropdownItem label="Products" href="/products" />
          <SidebarDropdownItem label="Orders" href="/orders" />
          <SidebarDropdownItem label="Categories" href="/categories" />
        </SidebarDropdownWrapper>
        <SidebarItem label="Configs" {spanClass}>
          <svelte:fragment slot="icon">
            <GridSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          <svelte:fragment slot="subtext">
            <span
              class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
            >
              Pro
            </span>
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Inbox" {spanClass}>
          <svelte:fragment slot="icon">
            <MailBoxSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          <svelte:fragment slot="subtext">
            <span
              class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-primary-600 bg-primary-200 rounded-full dark:bg-primary-900 dark:text-primary-200"
            >
              3
            </span>
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Users" href="/users">
          <svelte:fragment slot="icon">
            <UserSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="App Settings">
          <svelte:fragment slot="icon">
            <GearSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>

  <div class="p-6 min-h-screen">
    <slot />
  </div>
</main>
