import { Component, For } from "solid-js";
import { Link } from "@solidjs/router";
import { company } from "../config/constants";
import { authStore, logout } from "../stores/auth";
import { productsMenu } from "../config/data";
import { cart } from "../stores/cart";

const Navbar: Component<{}> = () => {
  const loggedIn = () => !!authStore.user
  const cartLength = () => cart.items.length

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
            <Link href="/our-products">
              Products
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </Link>
            <ul class="menu p-2 z-10 bg-base-100">
              <For each={productsMenu}>
                {
                  (item) => (
                    item.submenu ? (
                      <li tabindex="0">
                        <Link activeClass="" href={`/our-products/${item.slug}`}>{item.title} <svg xmlns="http://www.w3.org/2000/svg" class="fill-none w-4 h-4" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></Link>

                        <ul class="bg-base-100 p-0">
                          <For each={item.submenu}>
                            {
                              (subItem) => <li><Link href={`/our-products/${subItem.slug}`}>{subItem.title}</Link></li>
                            }
                          </For>
                        </ul>
                      </li>
                    ) : (
                      <li>
                        <Link href={`/our-products/${item.slug}`}>{item.title}</Link>
                      </li>
                    )
                  )
                }
              </For>
            </ul>
          </li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/support">Support</Link></li>
        </ul>
      </div>

      <div class="hidden lg:flex navbar-end gap-5">
        {cartLength() > 0 && (
          <div class="indicator">
            <Link href="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </Link>
            <span class="badge badge-xs badge-primary indicator-item">{cartLength()}</span>
          </div>
        )}

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