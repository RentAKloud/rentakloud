import { Component, Show, createSignal } from "solid-js"
import { useInstanceContext } from "./context"
import InstancesApi from "~/api/instances"
import { NotificationService } from "~/services/NotificationService"
import { InstanceAction } from "~/types/instance"

const Overview: Component<{}> = () => {
  const { instance } = useInstanceContext()!
  const [inTransit, setInTransit] = createSignal(false)

  async function stop() {
    action("stop", "Stopping VM...")
  }

  async function start() {
    action("start", "Starting VM...")
  }

  async function restart() {
    action("restart", "Restarting VM...")
  }

  async function action(action: InstanceAction, successMessage: string) {
    setInTransit(true)

    const { result, error } = await InstancesApi.action(instance.latest!.id, action, {})
    if (error) {
      NotificationService.error(error.message)
    } else if (result) {
      if (result.status)
        NotificationService.success(successMessage)
      else
        NotificationService.error(`Could not ${action} the VM right now`)
    }

    setInTransit(false)
  }

  return (
    <>
      <h2 class="text-4xl font-bold mb-2">{instance.latest?.title || instance.latest?.subscription.product.name || "Overview"}</h2>

      <section class="">
        <p>{instance.latest?.config.ram} GB RAM, {instance.latest?.config.cpus} vCPU, {instance.latest?.config.ssd} GB SSD</p>
        <p>Windows 10</p>
        <p>Houston, Zone A (us-east-1)</p>
        <p>Status: <strong classList={{
          "text-success": instance.latest?.status === "Active",
          "text-error": instance.latest?.status === "Inactive",
          "text-warning": instance.latest?.status === "Pending"
        }}>
          <Show when={instance.latest?.status === "Active"} fallback="Stopped">
            Running
          </Show>
        </strong></p>
      </section>

      <div class="divider divider-secondary" />

      <section>
        <h2 class="text-xl font-bold mb-4">Actions</h2>

        <Show
          when={instance.latest?.status === "Active"}
          fallback={<button class="btn btn-primary mr-2" onclick={start} disabled={inTransit()}>Start</button>}
        >
          <button class="btn btn-primary mr-2" onclick={stop} disabled={inTransit()}>Stop</button>
        </Show>
        <button class="btn btn-primary mb-2" onclick={restart} disabled={inTransit()}>Reboot</button>

      </section>

      <div class="divider divider-secondary" />

      <section class="">
        <h2 class="text-xl font-bold mb-2">Network Info</h2>

        <p>Public IP:</p>
        <p>Private IP:</p>
        <p>Public IPv6:</p>
      </section>
    </>
  )
}

export default Overview