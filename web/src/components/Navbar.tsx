import { Component } from "solid-js";
import { Link } from "@solidjs/router";
import { company } from "../config/constants";
import { authStore, logout } from "../stores/auth";

const Navbar: Component<{}> = () => {
  const loggedIn = () => !!authStore.user

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
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/support">Support</Link></li>
        </ul>
      </div>

      <div class="hidden lg:flex navbar-end">
        {
          !loggedIn() ? (
            <ul class="menu menu-horizontal">
              <li><Link href="/register">Signup</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          ) : (
            <>
              <button class="btn btn-ghost btn-circle">
                <div class="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span class="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>

              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full">
                    <img src="https://spectrum.ieee.org/media-library/ceo-of-comma-ai-george-geohot-hotz-speaks-onstage-during-techcrunch-disrupt-sf-2016-at-pier-48-on-september-13-2016-in-san-fr.jpg?id=25582060&width=980" />
                  </div>
                </label>
                <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <Link href="/dashboard" class="justify-between">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <a class="justify-between">
                      Profile
                      <span class="badge">New</span>
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a onClick={logout}>Logout</a></li>
                </ul>
              </div>
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar