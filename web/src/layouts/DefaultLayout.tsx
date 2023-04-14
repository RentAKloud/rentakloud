import { Toast } from "@kobalte/core";
import { Component, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import Collapse from "../components/Collapse/Collapse";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const DefaultLayout: Component<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <Navbar />

        {/* <!-- Page content here --> */}

        <main class="bg-base-200">
          {children}
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
        <ul class="menu p-4 w-80 bg-base-100">
          {/* <!-- Sidebar content here --> */}
          <Collapse title="Products" innerContent={
            <ul>
              <li>Databases Cloud Hosting</li>
              <li>ERP Cloud Hosting</li>
              <li>CRM Cloud Hosting</li>
              <li>CMS Cloud Hosting</li>
              <li>Ecommerce Cloud Hosting</li>
              <li>Message Queuing Services</li>
              <li>NodeJS</li>
              <li>Python</li>
              <li>Ruby</li>
            </ul>
          } />
          <li><a>Services</a></li>
          <li><a>About</a></li>
          <li><a>Contact</a></li>
        </ul>
      </aside>
    </div>
  )
}

export default DefaultLayout