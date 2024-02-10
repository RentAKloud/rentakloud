import { Component } from "solid-js"
import { useInstanceContext } from "./context"

const Overview: Component<{}> = () => {
  const { instance } = useInstanceContext()!

  return (
    <>
      <h2 class="text-4xl font-bold mb-2">{instance.latest?.title || instance.latest?.product?.name || "Overview"}</h2>
      <section class="flex justify-between">
        <div>
          <p>512 MB RAM, 1 vCPU, 20 GB SSD</p>
          <p>Windows 10</p>
          <p>Houston, Zone A (us-east-1)</p>
        </div>

        <div class="">
          <button class="btn btn-primary mr-2">Stop</button>
          <button class="btn btn-primary mb-2">Reboot</button>
          <p>Status: <strong>Running</strong></p>
        </div>
      </section>

      <div class="divider divider-secondary" />

      <section class="float-right">
        <p>Public IP:</p>
        <p>Private IP:</p>
        <p>Public IPv6:</p>
      </section>
    </>
  )
}

export default Overview