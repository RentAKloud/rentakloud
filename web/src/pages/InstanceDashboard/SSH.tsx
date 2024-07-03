import { Component, Match, Switch, createEffect, createSignal } from "solid-js"
import Loader from "~/components/Loader"
import { Icon } from "~/components/icons"
import { useInstanceContext } from "./context"

const SSH: Component<{}> = () => {
  const { instance, startSSH } = useInstanceContext()
  const [sshStatus, setSSHStatus] = createSignal<"ready"|"loading"|"fail"|"success">("ready")
  const port = () => instance.latest?.vmId ? instance.latest.vmId - 3000 + 2200 : -1
  const url = () => port() ? `https://rentakloud.com:${port()}` : ""

  createEffect(async () => {
    if (instance.latest?.vmId && sshStatus() === "ready") {
      setSSHStatus("loading")
      const rv = await startSSH()
      if (rv) {
        setSSHStatus("success")
      }
      setSSHStatus("fail")
    }
  })

  function picInPicMode() {
    const iFrame = document.querySelector('iframe')!
    const iDoc = iFrame.contentDocument || iFrame.contentWindow!.document
    const stream = iDoc.querySelector('canvas')!.captureStream()
    const target = document.querySelector('video')!
    target.srcObject = stream
    target.onplay = target.requestPictureInPicture
  }

  return (
    <>
      <section class="mb-4">
        <h2 class="text-4xl font-bold mb-5">SSH</h2>
        <p class="mb-2">Access your VM through SSH.</p>

        <div class="flex gap-4">
          <button class="btn" title="Fullscreen" onclick={() => document.getElementById("screen")?.requestFullscreen()}>
            <Icon.Fullscreen />
          </button>

          <button class="btn" title="Open in new window" onclick={() => window.open(url())}>
            <Icon.External />
          </button>

          <button class="btn" title="Picture-in-picture mode" onclick={picInPicMode}>
            <Icon.PictureInPicture />
          </button>
        </div>
      </section>

      <Switch>
        <Match when={instance.loading}>
          <Loader />
        </Match>

        <Match when={instance.latest!.status !== "Active"}>
          <div>Oh snap! Looks like the VM is not running.</div>
        </Match>

        <Match when={!instance.latest!.vmId}>
          Looks like the VM is not configured properly.
        </Match>

        <Match when={sshStatus() === "loading"}>
          Connecting to our secure SSH server...
        </Match>

        <Match when={instance.latest! && sshStatus() === "success"}>
          <iframe id="screen" src={url()} width="100%" style="aspect-ratio: 16 / 9;"></iframe>

          <video id="pip-target" controls autoplay style="display: none;"></video>
        </Match>
      </Switch>
    </>
  )
}

export default SSH