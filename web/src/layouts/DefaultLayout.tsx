import { Component, ErrorBoundary, Show, createEffect } from "solid-js";
import { Portal } from "solid-js/web";
import { useIsRouting } from "@solidjs/router";
import { Toast } from "@kobalte/core";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import { company } from "~/config/constants";
import { LayoutProps } from "~/types/ui";
import { authStore } from "~/stores/auth";
import NoticeEmailConfirmation from "~/components/NoticeEmailConfirmation";
import Crash from "~/pages/error/Crash";
import MobileNavbar from "./_MobileNavbar";

const DefaultLayout: Component<LayoutProps> = (props) => {
  createEffect(() => {
    document.title = props.title || company.DISPLAY_NAME;
  });
  const isRouting = useIsRouting();
  const user = () => authStore.user;
  const loggedIn = () => !!user();

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

        <MobileNavbar loggedIn={loggedIn()} />
      </aside>
    </div>
  );
};

export default DefaultLayout;
