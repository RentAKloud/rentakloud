import { Component, For, Match, Show, Switch } from "solid-js";
import { Link } from "@solidjs/router";
import { company } from "~/config/constants";
import { DateTime } from "./DateTime";
import ProfileDropdown from "./ProfileDropdown";
import { productsMenu } from "~/config/data";
import { cart } from "~/stores/cart";
import { authStore } from "~/stores/auth";
import { notifications, refetchNotifications } from "~/stores/global";
import NotificationsApi from "~/api/notifications";
import { NotificationStatus } from "~/types/notification";
import { Icon } from "./icons";

const Navbar: Component<{}> = () => {
  const loggedIn = () => !!authStore.user;
  const cartLength = () => cart.items.length;

  return (
    <nav class="w-full navbar bg-base-300">
      <div class="navbar-start">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <Icon.Menu />
          </label>
        </div>
        <div class="flex-1 px-2 mx-2">
          <Link href="/" class="flex flex-row items-center gap-2">
            <img src={company.LOGO_URL} style={{ width: "60px" }} />
            <span>
              <strong>RentA</strong>Kloud
            </span>
          </Link>
        </div>
      </div>

      <div class="hidden lg:flex navbar-center">
        <ul class="menu menu-horizontal">
          {/* <!-- Navbar menu content here --> */}
          <li tabindex="0" class="dropdown dropdown-hover">
            {/* <Link href="/our-products"> */}
            <Link href="#" activeClass="">
              Products
              <Icon.ChevronDown class="w-4 h-4 stroke-2" />
            </Link>
            <ul class="dropdown-content menu xl:menu-horizontal lg:min-w-max bg-base-100 rounded-box z-10 ml-[-0.1em]">
              <For each={productsMenu()}>
                {(item) =>
                  item.submenu ? (
                    <li>
                      <Link href="#" activeClass="">
                        {/* <Link href={`/our-products/${item.slug}`} activeClass=""> */}
                        {item.title}
                      </Link>

                      <ul>
                        <For each={item.submenu}>
                          {(subItem) => (
                            <li>
                              <Link href={`/our-products/${subItem.slug}`}>
                                {subItem.title}
                              </Link>
                            </li>
                          )}
                        </For>
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <Link href={`/our-products/${item.slug}`}>
                        {item.title}
                      </Link>
                    </li>
                  )
                }
              </For>
            </ul>
          </li>
          {/* <li><Link href="/services">Services</Link></li> */}
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/support">Support</Link>
          </li>
        </ul>
      </div>

      <div class="navbar-end gap-5">
        <Show when={cartLength() > 0}>
          <Link href="/cart">
            <div class="btn btn-ghost btn-circle">
              <div class="indicator">
                <Icon.Cart class="w-5 h-5" />
                <span class="badge badge-xs badge-primary indicator-item">
                  {cartLength()}
                </span>
              </div>
            </div>
          </Link>
        </Show>

        <div class="hidden lg:flex">
          <Switch>
            <Match when={!loggedIn()}>
              <ul class="menu menu-horizontal">
                <li>
                  <Link href="/register">Signup</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </ul>
            </Match>
            <Match when={loggedIn()}>
              <div class="dropdown dropdown-end">
                <Notifications />
              </div>

              <ul class="menu menu-horizontal">
                <li>
                  <Link href="/dashboard" end>
                    Dashboard
                  </Link>
                </li>
              </ul>

              <div class="dropdown dropdown-end">
                <ProfileDropdown />
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    </nav>
  );
};

const Notifications: Component = () => {
  return (
    <>
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <Icon.Bell class="h-5 w-5" />
          <Show when={notifications.latest && notifications.latest.length > 0}>
            <span class="badge badge-xs badge-primary indicator-item"></span>
          </Show>
        </div>
      </button>

      <div
        class="dropdown-content menu menu-compact mt-3 p-4 z-10 shadow
        bg-base-100 rounded-box w-96 h-96 overflow-y-scroll flex-row"
      >
        <Show when={notifications.loading}>Loading notifications...</Show>
        <Show when={notifications.error}>Something went wrong.</Show>
        <Show when={notifications.latest && notifications.latest.length === 0}>
          No notifications yet.
        </Show>

        <For each={notifications.latest}>
          {(notification) => {
            return (
              <div class="flex flex-col my-2 justify-center w-full">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> */}
                <div class="flex justify-between">
                  <h4
                    classList={{
                      "font-bold":
                        notification.status === NotificationStatus.Created,
                    }}
                  >
                    {notification.title}
                  </h4>
                  <button
                    class="hover:text-accent"
                    title="Mark as read"
                    onclick={async () => {
                      await NotificationsApi.updateStatus(
                        notification.id,
                        NotificationStatus.Read,
                      );
                      setTimeout(refetchNotifications, 1000);
                    }}
                  >
                    <Icon.Eye />
                  </button>
                </div>
                <DateTime value={notification.createdAt} ago />
                {/* <button>Mark as Read</button> */}
              </div>
            );
          }}
        </For>
      </div>
    </>
  );
};

export default Navbar;
