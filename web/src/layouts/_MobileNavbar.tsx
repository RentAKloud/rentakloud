import { Link } from "@solidjs/router";
import { Component, For, Match, Show, Switch } from "solid-js";
import Collapse from "~/components/Collapse/Collapse";
import { productsMenu } from "~/config/data";
import { logout } from "~/stores/auth";

const MobileNavbar: Component<{ loggedIn: boolean }> = (props) => {
  return (
    <ul class="menu p-4 w-80 bg-base-100 min-h-full">
      <Switch>
        <Match when={!props.loggedIn}>
          <li>
            <Link href="/register">Signup</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </Match>
        <Match when={props.loggedIn}>
          <li>
            <Link href="/dashboard" end>
              Dashboard
            </Link>
          </li>
        </Match>
      </Switch>

      {/* <!-- Sidebar content here --> */}
      <Collapse title="Products">
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
                <Link href={`/our-products/${item.slug}`}>{item.title}</Link>
              </li>
            )
          }
        </For>
      </Collapse>
      {/* <li>
        <Link href="/services">Services</Link>
      </li> */}
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/support">Contact</Link>
      </li>

      <Show when={props.loggedIn}>
        <li class="mt-[100%]">
          <Link href="/dashboard/settings">Settings</Link>
        </li>
        <li>
          <a onClick={logout}>Logout</a>
        </li>
      </Show>
    </ul>
  );
};

export default MobileNavbar;
