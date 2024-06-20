import { Component, For, Show, createResource, createSignal } from "solid-js";
import { Link } from "@solidjs/router";
import Card from "~/components/Card/Card";
import { DateTime } from "~/components/DateTime";
import ListIcon from "~/components/icons/List";
import GridIcon from "~/components/icons/Grid";
import CLIIcon from "~/components/icons/CLI";
import DesktopIcon from "~/components/icons/Desktop";
import InstancesApi from "~/api/instances";
import { Icon } from "~/components/icons";

const Instances: Component = () => {
  const [instances, { refetch }] = createResource(async () => {
    const { result, error } = await InstancesApi.all()
    if (error) throw error
    return result
  })
  const [activeView, setActiveView] = createSignal<"grid" | "list">("grid")

  return (
    <>
      <h2 class="text-4xl font-bold mb-2">Instances ({instances.latest?.length})</h2>
      <p class="mb-5">Your active subscriptions.</p>

      <section class="mb-10">
        <Link href="new" class="btn btn-outline">New</Link>
      </section>

      <section>
        <Show when={instances.latest?.length === 0}>
          <p>Nothing to see here.</p>
        </Show>

        <Show when={!instances.loading && instances.latest!.length > 0}>

          {/* View mode */}
          <div class="text-right">
            <ul class="menu menu-horizontal bg-base-100 rounded-box mb-6">
              <li>
                <a class="tooltip" classList={{ active: activeView() === "grid" }} data-tip="Grid view" onclick={() => setActiveView("grid")}>
                  <GridIcon />
                </a>
              </li>
              <li>
                <a class="tooltip" classList={{ active: activeView() === "list" }} data-tip="List view" onclick={() => setActiveView("list")}>
                  <ListIcon />
                </a>
              </li>
            </ul>
          </div>

          <Show when={activeView() === "grid"}>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <For each={instances.latest}>
                {
                  (instance) => (
                    <Card
                      title={instance.title || instance.subscription.product.name}
                      description={
                        <>
                          <div class="flex flex-col gap-3">
                            <div class="flex gap-2">
                              <Icon.Windows />
                              <span classList={{
                                "text-warning": instance.status === "Pending",
                                "text-error": instance.status === "Inactive",
                                "text-success": instance.status === "Active"
                              }}>{instance.status}</span>
                            </div>
                            {/* <p>Instance ID: {instance.id}</p> */}
                            {/* <p>{instance.product.shortDescription}</p> */}
                            {/* <span>Started At: <DateTime value={instance.createdAt} /></span> */}
                          </div>
                          <div class="dropdown dropdown-end absolute top-2 right-2">
                            <label tabindex="0" class="btn btn-ghost btn-circle">
                              <Icon.EllipsesVertical />
                            </label>

                            <ul tabindex="0" class="dropdown-content menu menu-compact mt-3 p-2 z-10 shadow bg-base-200 rounded-box w-52">
                              <li>
                                <Link href={`/instances/${instance.id}`}>Details</Link>
                              </li>
                              <li><a>Start</a></li>
                              <li><a>Reboot</a></li>
                            </ul>
                          </div>
                        </>
                      }
                      actions={<div class="flex gap-5 items-center justify-start flex-wrap">
                        <a href="http://204.27.57.219:4200/" target="_blank" class="btn"><CLIIcon /> SSH</a>
                        <Link href={`/instances/${instance.id}/stream`} class="btn"><DesktopIcon /> VNC</Link>
                      </div>}
                      actionsAlign="left"
                    />
                  )
                }
              </For>
            </div>
          </Show>

          <Show when={activeView() === "list"}>
            <div class="overflow-x-auto">
              <table class="table">
                {/* <!-- head --> */}
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" class="checkbox" />
                      </label>
                    </th>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Subscription Started</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <For each={instances.latest}>
                    {
                      (instance) => (
                        <tr>
                          <th>
                            <label>
                              <input type="checkbox" class="checkbox" />
                            </label>
                          </th>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">
                                  <img src={instance.subscription.product.images[0]?.src} alt={instance.subscription.product.images[0]?.alt} />
                                </div>
                              </div>
                              <div>
                                <div class="font-bold">{instance.subscription.product.name}</div>
                                <div class="text-sm opacity-50">us-east-1</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {instance.id}
                            <br />
                            <span class="badge badge-ghost badge-sm">{"204.27.57.219"}</span>
                          </td>
                          <td classList={{
                            "text-error": instance.status === "Inactive",
                            "text-success": instance.status === "Active"
                          }}>{instance.status}</td>
                          <td><DateTime value={instance.createdAt} /></td>
                          <td><a href="http://204.27.57.219:4200/" target="_blank" class="btn btn-ghost"><CLIIcon /></a></td>
                          <th>
                            <Link href={`/instances/${instance.id}`} class="btn btn-ghost btn-xs">details</Link>
                          </th>
                        </tr>
                      )
                    }
                  </For>
                </tbody>
                {/* <!-- foot --> */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Subscription Started</th>
                    <th></th>
                    <th></th>
                  </tr>
                </tfoot>

              </table>
            </div>
          </Show>
        </Show>
      </section>
    </>
  )
}

export default Instances