import { Component } from "solid-js"
import { useInstanceContext } from "./context"

const Overview: Component<{}> = () => {
  const { instance } = useInstanceContext()!

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">{instance.latest?.title || instance.latest?.product?.name || "Overview"}</h2>
    </>
  )
}

export default Overview