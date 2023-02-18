import { Component } from "solid-js";
import { Link } from "@solidjs/router";
import { company } from "../config/constants";

const Navbar: Component = () => {
  return (
    <nav class="w-full navbar bg-base-300">
      <div class="navbar-start">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2">
          <Link href="/" class="flex flex-row items-center gap-2">
            <img src={company.LOGO_URL} style={{ width: "60px" }} />
            <span><strong>RentA</strong>Kloud</span>
          </Link>
        </div>
      </div>

      <div class="hidden lg:flex navbar-center">
        <ul class="menu menu-horizontal">
          {/* <!-- Navbar menu content here --> */}
          <li tabindex="0">
            <Link href="/products">
              Products
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </Link>
            <ul class="p-2 z-10 bg-base-100">
              <li><Link href="/products/databases-cloud-hosting">Databases Cloud Hosting</Link></li>
              <li><Link href="/products/erp-cloud-hosting">ERP Cloud Hosting</Link></li>
              <li><Link href="/products/crm-cloud-hosting">CRM Cloud Hosting</Link></li>
              <li><Link href="/products/cms-cloud-hosting">CMS Cloud Hosting</Link></li>
              <li><Link href="/products/ecommerce-solutions">Ecommerce Cloud Hosting</Link></li>
              <li><Link href="/products/message-queueing-service-hosting">Message Queuing Services</Link></li>
              <li><Link href="/products/nodejs-cloud-hosting">NodeJS</Link></li>
              <li><Link href="/products/python-cloud-hosting">Python</Link></li>
              <li><Link href="/products/ruby-cloud-hosting">Ruby</Link></li>
            </ul>
          </li>
          <li><a>Services</a></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/support">Support</Link></li>
        </ul>
      </div>

      <div class="hidden lg:flex navbar-end">
        <ul class="menu menu-horizontal">
          <li><Link href="/register">Signup</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar