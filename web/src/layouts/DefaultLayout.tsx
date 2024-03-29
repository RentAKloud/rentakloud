import { Component, ErrorBoundary, Match, Show, Switch, createEffect } from "solid-js";
import { Portal } from "solid-js/web";
import { Link, useIsRouting } from "@solidjs/router";
import { Toast } from "@kobalte/core";
import Collapse from "~/components/Collapse/Collapse";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { company } from "~/config/constants";
import { LayoutProps } from "~/types/ui";
import { authStore, logout } from "~/stores/auth";
import NoticeEmailConfirmation from "~/components/NoticeEmailConfirmation";
import Crash from "~/pages/error/Crash";

const DefaultLayout: Component<LayoutProps> = (props) => {
  createEffect(() => {
    document.title = props.title || company.DISPLAY_NAME
  })
  const isRouting = useIsRouting()
  const user = () => authStore.user
  const loggedIn = () => !!user()

  return (
    <div class="drawer">
      <Show when={isRouting()}>
        <progress class="progress w-full fixed"></progress>
      </Show>

      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <Show when={loggedIn() && !user()!.emailVerifiedAt}>
          <NoticeEmailConfirmation />
        </Show>

        {/* <!-- Navbar --> */}
        <Navbar />

        {/* <!-- Page content here --> */}

        <main class="bg-base-200">
          <ErrorBoundary fallback={<Crash withoutLayout />}>
            {props.children}
          </ErrorBoundary>
        </main>

        <Portal>
          <Toast.Region>
            <Toast.List class="toast" />
          </Toast.Region>
        </Portal>

        <Footer />
      </div>
      <aside class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>

        <ul class="menu p-4 w-80 bg-base-100 min-h-full">
          <Switch>
            <Match when={!loggedIn()}>
              <li><Link href="/register">Signup</Link></li>
              <li><Link href="/login">Login</Link></li>
            </Match>
            <Match when={loggedIn()}>
              <li><Link href="/dashboard" end>Dashboard</Link></li>
            </Match>
          </Switch>

          {/* <!-- Sidebar content here --> */}
          <Collapse title="Products">
            <ul>
              <li><Link activeClass="" href="/our-products">All</Link></li>
              <li><Link activeClass="" href="/our-products?category=databases">Databases Cloud Hosting</Link></li>
              <li><Link activeClass="" href="/our-products?category=erp">ERP Cloud Hosting</Link></li>
              <li><Link activeClass="" href="/our-products?category=crm">CRM Cloud Hosting</Link></li>
              <li><Link activeClass="" href="/our-products?category=cms">CMS Cloud Hosting</Link></li>
              <li><Link activeClass="" href="/our-products?category=ecommerce">Ecommerce Cloud Hosting</Link></li>
              <li><Link activeClass="" href="/our-products?category=message-queueing">Message Queuing Services</Link></li>
              <li><Link activeClass="" href="/our-products/nodejs">NodeJS</Link></li>
              <li><Link activeClass="" href="/our-products/python">Python</Link></li>
              <li><Link activeClass="" href="/our-products/ruby">Ruby</Link></li>
            </ul>
          </Collapse>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>

          <Show when={loggedIn()}>
            <li class="mt-[100%]"><Link href="/dashboard/settings">Settings</Link></li>
            <li><a onClick={logout}>Logout</a></li>
          </Show>
        </ul>
      </aside>
    </div>
  )
}

export default DefaultLayout