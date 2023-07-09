import { Toast } from "@kobalte/core";
import { Component, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import Collapse from "../components/Collapse/Collapse";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "@solidjs/router";

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
        <ul class="menu p-4 w-80 bg-base-100 h-full">
          {/* <!-- Sidebar content here --> */}
          <Collapse title="Products" innerContent={
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
          } />
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </aside>
    </div>
  )
}

export default DefaultLayout