import { Component, For, Match, Show, Switch, createResource } from "solid-js";
import { Link } from "@solidjs/router";
import { company } from "~/config/constants";
import { authStore, logout } from "~/stores/auth";
import { productsMenu } from "~/config/data";
import { cart } from "~/stores/cart";
import MenuIcon from "./icons/Menu";
import NotificationsApi from "~/api/notifications";
import BellIcon from "./icons/Bell";
import { DateTime } from "./DateTime";
import { NotificationStatus } from "~/types/notification";
import EyeIcon from "./icons/Eye";

const Navbar: Component<{}> = () => {
  const loggedIn = () => !!authStore.user
  const cartLength = () => cart.items.length

  return (
    <nav class="w-full navbar bg-base-300">
      <div class="navbar-start">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <MenuIcon />
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
          <li tabindex="0" class="dropdown dropdown-hover">
            <Link href="/our-products">
              Products
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </Link>
            <ul class="dropdown-content menu xl:menu-horizontal lg:min-w-max bg-base-100 rounded-box z-10 ml-[-0.1em]">
              <For each={productsMenu()}>
                {
                  (item) => (
                    item.submenu ? (
                      <li>
                        <Link href={`/our-products/${item.slug}`} activeClass="">{item.title}</Link>

                        <ul>
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
          {/* <li><Link href="/services">Services</Link></li> */}
          <li><Link href="/about">About</Link></li>
          <li><Link href="/support">Support</Link></li>
        </ul>
      </div>

      <div class="hidden lg:flex navbar-end gap-5">
        <Show when={cartLength() > 0}>
          <Link href="/cart">
            <div class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span class="badge badge-xs badge-primary indicator-item">{cartLength()}</span>
              </div>
            </div>
          </Link>
        </Show>

        <Switch>
          <Match when={!loggedIn()}>
            <ul class="menu menu-horizontal">
              <li><Link href="/register">Signup</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </Match>
          <Match when={loggedIn()}>
            <div class="dropdown dropdown-end">
              <Notifications />
            </div>

            <ul class="menu menu-horizontal">
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>

            <div class="dropdown dropdown-end">
              <Profile />
            </div>
          </Match>
        </Switch>
      </div>
    </nav>
  )
}

const Notifications: Component = () => {
  const [notifications, { refetch }] = createResource(async () => {
    const { result, error } = await NotificationsApi.all()
    if (!error) {
      return result
    }
  })

  return (
    <>
      <button class="btn btn-ghost btn-circle">
        {/* TODO indicator if unread notifications */}
        <div class="indicator">
          <BellIcon class="h-5 w-5" />
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>

      <div class="dropdown-content menu menu-compact mt-3 p-4 z-10 shadow bg-base-100 rounded-box w-96">
        <Show when={notifications.loading}>
          Loading notifications...
        </Show>
        <Show when={notifications.error}>
          Something went wrong.
        </Show>
        <Show when={!notifications.loading && notifications.latest!.length === 0}>
          No notifications yet.
        </Show>

        <For each={notifications.latest}>
          {(notification) => {
            return (
              <div class="flex flex-col my-2 justify-center">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                <div class="flex justify-between">
                  <h4
                    classList={{
                      "font-bold": notification.status === NotificationStatus.Created
                    }}
                  >{notification.title}</h4>
                  <button title="Mark as Read">
                    <EyeIcon />
                  </button>
                </div>
                <DateTime value={notification.createdAt} ago />
                {/* <button>Mark as Read</button> */}
              </div>
            )
          }}
        </For>
      </div>
    </>
  )
}

const Profile: Component = () => {
  return (
    <>
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://spectrum.ieee.org/media-library/ceo-of-comma-ai-george-geohot-hotz-speaks-onstage-during-techcrunch-disrupt-sf-2016-at-pier-48-on-september-13-2016-in-san-fr.jpg?id=25582060&width=980" />
        </div>
      </label>

      <ul tabindex="0" class="dropdown-content menu menu-compact mt-3 p-2 z-10 shadow bg-base-100 rounded-box w-52">
        {/* <li>
          <Link href="/dashboard" end class="justify-between">
            Dashboard
          </Link>
        </li> */}
        <li>
          <Link href="/dashboard/profile" class="justify-between">
            Profile
            {/* <span class="badge">New</span> */}
          </Link>
        </li>
        <li><Link href="/dashboard/settings">Settings</Link></li>
        <li><a onClick={logout}>Logout</a></li>
      </ul>
    </>
  )
}

export default Navbar