import { Component } from "solid-js"
import { Link, Outlet } from "@solidjs/router"
import DefaultLayout from "../../layouts/DefaultLayout"

const Dashboard: Component<{}> = () => {
  return (
    <DefaultLayout>
      <div class="flex">
        <div class="py-20">
          <ul class="menu bg-base-100 w-56">
            <li><Link href="/dashboard/overview">Home</Link></li>
            <li><Link href="/dashboard/instances">Instances</Link></li>
            <li><Link href="/dashboard/images">Images</Link></li>
            <li><Link href="/dashboard/backups">Backups</Link></li>
            <li><Link href="/dashboard/orders">Orders</Link></li>
            <li><Link href="/dashboard/payments">Payments</Link></li>
            <li><Link href="/dashboard/settings">Settings</Link></li>
          </ul>
        </div>

        <div class="flex-1 place-items-center bg-base-300 p-10">
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Dashboard