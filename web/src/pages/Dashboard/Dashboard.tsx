import { Component } from "solid-js"
import { Link, Outlet } from "@solidjs/router"
import DefaultLayout from "../../layouts/DefaultLayout"

const Dashboard: Component<{}> = () => {
  return (
    <DefaultLayout>
      <div class="flex">
        <div class="py-20">
          <ul class="menu bg-base-100 w-56">
            <li><Link href="/dashboard/overview">Overview</Link></li>
            <li><Link href="/dashboard/site-ssl">Site & SSL</Link></li>
            <li><Link href="/dashboard/database">Database/phpMyAdmin</Link></li>
            <li><Link href="/dashboard/file-manager">File Manager</Link></li>
            <li><Link href="/dashboard/ssh">Shell/SSH</Link></li>
            <li><Link href="/dashboard/ftps">FTPS</Link></li>
            <li><Link href="/dashboard/metrics">Metrics</Link></li>
            <li><Link href="/dashboard/snapshots">Snapshots</Link></li>
            <li><Link href="/dashboard/events">Events</Link></li>
            <li><Link href="/dashboard/guidance-help">Guidance</Link></li>
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