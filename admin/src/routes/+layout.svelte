<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";
  import {
    Footer,
    FooterCopyright,
    FooterLinkGroup,
    FooterBrand,
    FooterLink,
  } from "flowbite-svelte";
  import "../app.css";
</script>

<svelte:head>
  <title>RKAdmin</title>
</svelte:head>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img src="/logo-60x60.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    >
      RK Admin
    </span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Dashboard</NavLi>
    <NavLi href="/login">Login</NavLi>
  </NavUl>
</Navbar>

<slot />

<Footer footerType="logo">
  <div class="sm:flex sm:items-center sm:justify-between">
    <FooterBrand
      href="https://rentakloud.com.com"
      src="/logo-60x60.png"
      alt="Flowbite Logo"
      name="RentAKloud"
    />
    <FooterLinkGroup
      ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
    >
      <FooterLink href="https://rentakloud.com/about">About</FooterLink>
      <FooterLink href="https://rentakloud.com/legal/privacy-policy"
        >Privacy Policy</FooterLink
      >
      <FooterLink href="/">Licensing</FooterLink>
      <FooterLink href="https://rentakloud.com/contact">Contact</FooterLink>
    </FooterLinkGroup>
  </div>
  <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
  <FooterCopyright href="/" by="RentAKloud&trade;" />
</Footer>
