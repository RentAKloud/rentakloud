import { Component } from "solid-js"
import { Link, Outlet, useParams } from "@solidjs/router"
import DefaultLayout from "~/layouts/DefaultLayout"
import { InstanceProvider } from "./context"

const _InstanceDashboard: Component<{}> = () => {
  const { id } = useParams()

  return (
    <DefaultLayout>
      <div class="flex">
        <div class="py-20">
          <ul class="menu bg-base-100 w-56">
            <Link href="/dashboard/instances">&larr; Back</Link>
            <li><Link href={`/products/${id}/overview`}>Overview</Link></li>
            <li><Link href={`/products/${id}/stream`}>Stream</Link></li>
            {/* <li><Link href={`/products/${id}/site-ssl`}>Site & SSL</Link></li> */}
            {/* <li><Link href={`/products/${id}/database`}>Database/phpMyAdmin</Link></li> */}
            {/* <li><Link href={`/products/${id}/file-manager`}>File Manager</Link></li> */}
            {/* <li><Link href={`/products/${id}/ssh`}>Shell/SSH</Link></li> */}
            {/* <li><Link href={`/products/${id}/ftps`}>FTPS</Link></li> */}
            {/* <li><Link href={`/products/${id}/metrics`}>Metrics</Link></li> */}
            {/* <li><Link href={`/products/${id}/snapshots`}>Snapshots</Link></li> */}
            {/* <li><Link href={`/products/${id}/events`}>Events</Link></li> */}
            <li><Link href={`/products/${id}/settings`}>Settings</Link></li>
            <li><Link href={`/products/${id}/guidance-help`}>Guidance</Link></li>
          </ul>
        </div>

        <div class="flex-1 place-items-center bg-base-300 p-10">
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  )
}

const InstanceDashboard = () => <InstanceProvider><_InstanceDashboard /></InstanceProvider>

export default InstanceDashboard