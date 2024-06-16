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
            <li><Link href={`/instances/${id}/overview`}>Overview</Link></li>
            <li><Link href={`/instances/${id}/stream`}>Stream</Link></li>
            {/* <li><Link href={`/instances/${id}/site-ssl`}>Site & SSL</Link></li> */}
            {/* <li><Link href={`/instances/${id}/database`}>Database/phpMyAdmin</Link></li> */}
            {/* <li><Link href={`/instances/${id}/file-manager`}>File Manager</Link></li> */}
            {/* <li><Link href={`/instances/${id}/ssh`}>Shell/SSH</Link></li> */}
            {/* <li><Link href={`/instances/${id}/ftps`}>FTPS</Link></li> */}
            {/* <li><Link href={`/instances/${id}/metrics`}>Metrics</Link></li> */}
            {/* <li><Link href={`/instances/${id}/snapshots`}>Snapshots</Link></li> */}
            {/* <li><Link href={`/instances/${id}/events`}>Events</Link></li> */}
            <li><Link href={`/instances/${id}/settings`}>Settings</Link></li>
            <li><Link href={`/instances/${id}/guidance-help`}>Guidance</Link></li>
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