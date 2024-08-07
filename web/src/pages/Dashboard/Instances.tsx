import {
  Component,
  For,
  Match,
  Show,
  Switch,
  createResource,
  createSignal,
} from "solid-js";
import { Link, useSearchParams } from "@solidjs/router";
import Card from "~/components/Card/Card";
import { DateTime } from "~/components/DateTime";
import ListIcon from "~/components/icons/List";
import GridIcon from "~/components/icons/Grid";
import CLIIcon from "~/components/icons/CLI";
import DesktopIcon from "~/components/icons/Desktop";
import InstancesApi from "~/api/instances";
import { Icon } from "~/components/icons";
import { Instance } from "~/types/instance";
import Search from "~/components/Inputs/Search";
import Loader from "~/components/Loader";
import { action } from "../InstanceDashboard/context";
import { dateToDaysAgo } from "~/utils";

const Instances: Component = () => {
  const [params, setParams] = useSearchParams();

  setParams({
    "sort-by": params["sort-by"] || "createdAt",
    "sort-order": params["sort-order"] || "desc",
  });

  const searchQuery = () => params.q || "";
  const paramChangeSig = () =>
    params.q + params["sort-by"] + params["sort-order"];

  const [instances, { refetch }] = createResource(paramChangeSig, async () => {
    const { result, error } = await InstancesApi.all(
      new URLSearchParams(params),
    );
    if (error) throw error;
    return result;
  });
  const [activeView, setActiveView] = createSignal<"grid" | "list">("grid");

  function updateSort(value: string) {
    const values = value.split("-");
    setParams({
      "sort-by": values[0],
      "sort-order": values[1],
    });
  }

  return (
    <>
      <h2 class="text-4xl font-bold mb-2">
        Instances ({instances.latest?.length})
      </h2>
      <p class="mb-5">Your active VMs.</p>

      <section class="mb-10">
        {/* <Link href="new" class="btn btn-outline">New</Link> */}
      </section>

      <section>
        <Switch>
          <Match when={!instances.latest && instances.loading}>
            <Loader />
          </Match>

          <Match when={instances.error}>Something went wrong</Match>

          <Match
            when={
              instances.latest &&
              instances.latest.length === 0 &&
              searchQuery() === ""
            }
          >
            <p>Nothing to see here.</p>
          </Match>

          <Match
            when={
              (instances.latest && instances.latest.length > 0) ||
              searchQuery() !== ""
            }
          >
            <div class="flex gap-4 justify-between">
              <Search />

              <select
                class="select select-bordered w-full max-w-xs"
                onchange={(e) => updateSort(e.currentTarget.value)}
                value={`${params["sort-by"]}-${params["sort-order"]}`}
              >
                <option disabled selected>
                  Sort By
                </option>
                <option value="createdAt-desc">Newest</option>
                <option value="createdAt-asc">Oldest</option>
                <option value="title-asc">Name</option>
              </select>

              {/* View mode */}
              <div class="text-right">
                <ul class="menu menu-horizontal bg-base-100 rounded-box mb-6">
                  <li>
                    <a
                      class="tooltip"
                      classList={{ active: activeView() === "grid" }}
                      data-tip="Grid view"
                      onclick={() => setActiveView("grid")}
                    >
                      <GridIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      class="tooltip"
                      classList={{ active: activeView() === "list" }}
                      data-tip="List view"
                      onclick={() => setActiveView("list")}
                    >
                      <ListIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <Show when={activeView() === "grid"}>
              <GridView instances={instances.latest!} refetch={refetch} />
            </Show>

            <Show when={activeView() === "list"}>
              <ListView instances={instances.latest!} />
            </Show>
          </Match>
        </Switch>
      </section>
    </>
  );
};

const GridView: Component<{ instances: Instance[]; refetch: Function }> = (
  props,
) => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <For
        each={props.instances}
        fallback={"Looks like search returned nothing"}
      >
        {(instance) => {
          const isNew = dateToDaysAgo(new Date(instance.createdAt)) <= 2;
          const os =
            instance.subscription.product.slug === "rak-daas"
              ? "windows"
              : "linux";
          return (
            <Card
              title={
                <>
                  <Link
                    href={`/instances/${instance.id}`}
                    class="link link-hover"
                    title={`${instance.vmId}`}
                  >
                    {instance.title || instance.subscription.product.name}
                  </Link>
                  <Show when={isNew}>
                    <span class="badge badge-md text-white bg-primary border-transparent font-bold">
                      NEW
                    </span>
                  </Show>
                </>
              }
              actions={
                <div class="flex gap-5 items-center justify-start flex-wrap">
                  <Show when={os === "linux"}>
                    <Link href={`/instances/${instance.id}/ssh`} class="btn">
                      <CLIIcon /> SSH
                    </Link>
                  </Show>
                  <Link href={`/instances/${instance.id}/stream`} class="btn">
                    <DesktopIcon /> VNC
                  </Link>
                </div>
              }
              actionsAlign="left"
              class="max-w-96"
              bgClass={
                isNew
                  ? "from-primary/20 to-primary/0 hover:to-primary/5 to-60% [background-image:linear-gradient(-35deg,var(--tw-gradient-stops))]"
                  : ""
              }
            >
              <div class="flex flex-col gap-3">
                <div class="flex gap-2">
                  <Show
                    when={os === "windows"}
                    fallback={<Icon.Linux class="w-7 h-7" />}
                  >
                    <Icon.Windows />
                  </Show>
                  <span
                    classList={{
                      "text-warning": instance.status === "Pending",
                      "text-error": instance.status === "Inactive",
                      "text-success": instance.status === "Active",
                    }}
                  >
                    {instance.status}
                  </span>
                  <span>&bull;</span>
                  <span>{instance.hostName}</span>
                </div>
                {/* <p>Instance ID: {instance.id}</p> */}
                {/* <p>{instance.product.shortDescription}</p> */}
                {/* <span>Started At: <DateTime value={instance.createdAt} /></span> */}
              </div>
              <div class="dropdown dropdown-end absolute top-2 right-2">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                  <Icon.EllipsesVertical />
                </label>

                <ul
                  tabindex="0"
                  class="dropdown-content menu menu-compact mt-3 p-2 z-10 shadow bg-base-200 rounded-box w-52"
                >
                  <li>
                    <Link href={`/instances/${instance.id}`}>Details</Link>
                  </li>
                  <li>
                    <Show
                      when={instance.status === "Inactive"}
                      fallback={
                        <a
                          onclick={() =>
                            action(
                              instance.id,
                              "stop",
                              "Stopped VM",
                              props.refetch,
                            )
                          }
                        >
                          Stop
                        </a>
                      }
                    >
                      <a
                        onclick={() =>
                          action(
                            instance.id,
                            "start",
                            "Started VM",
                            props.refetch,
                          )
                        }
                      >
                        Start
                      </a>
                    </Show>
                  </li>
                  <li>
                    <a
                      onclick={() =>
                        action(
                          instance.id,
                          "restart",
                          "Restarted VM",
                          props.refetch,
                        )
                      }
                    >
                      Reboot
                    </a>
                  </li>
                </ul>
              </div>
            </Card>
          );
        }}
      </For>
    </div>
  );
};

const ListView: Component<{ instances: Instance[] }> = (props) => {
  return (
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
          <For
            each={props.instances}
            fallback={"Looks like search returned nothing"}
          >
            {(instance) => {
              const os =
                instance.subscription.product.slug === "rak-daas"
                  ? "windows"
                  : "linux";

              return (
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
                          {/* <img
                            src={instance.subscription.product.images[0]?.src}
                            alt={instance.subscription.product.images[0]?.alt}
                          /> */}
                          <Show
                            when={os === "windows"}
                            fallback={<Icon.Linux class="w-7 h-7" />}
                          >
                            <Icon.Windows />
                          </Show>
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">
                          {instance.title || instance.subscription.product.name}
                        </div>
                        <div class="text-sm opacity-50">us-east-1</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {instance.id}
                    <br />
                    <span class="badge badge-ghost badge-sm">
                      {instance.publicIp}
                    </span>
                  </td>
                  <td
                    classList={{
                      "text-error": instance.status === "Inactive",
                      "text-success": instance.status === "Active",
                    }}
                  >
                    {instance.status}
                  </td>
                  <td>
                    <DateTime value={instance.createdAt} />
                  </td>
                  <td>
                    <Show when={os === "linux"}>
                      <Link
                        href={`/instances/${instance.id}/ssh`}
                        class="btn btn-ghost"
                        title="SSH/Shell"
                      >
                        <CLIIcon />
                      </Link>
                    </Show>
                    <Link
                      href={`/instances/${instance.id}/stream`}
                      class="btn btn-ghost"
                      title="VNC/Stream"
                    >
                      <DesktopIcon />
                    </Link>
                  </td>
                  <th>
                    <Link
                      href={`/instances/${instance.id}`}
                      class="btn btn-ghost btn-xs"
                    >
                      details
                    </Link>
                  </th>
                </tr>
              );
            }}
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
  );
};

export default Instances;
