import { useParams } from "@solidjs/router"
import { Component, Show } from "solid-js"
import { products } from "../../config/data"
import DefaultLayout from "../../layouts/DefaultLayout"
import NotFound from "../error/NotFound"
import { PhysicalProduct } from "./PhysicalProduct"
import { ServiceProduct } from "./ServiceProduct"

const ProductDetail: Component<{}> = () => {
  const product = () => {
    const { slug } = useParams()
    return products.find(p => p.slug === slug)
  }
  const isAHarwareProduct = () => (product()?.categories || []).includes("Hardware")

  return (
    <DefaultLayout>
      <Show when={!product()}>
        <NotFound withoutLayout />
      </Show>

      <Show when={isAHarwareProduct()}>
        <PhysicalProduct product={product()!} />
      </Show>

      <Show when={product() && !isAHarwareProduct()}>
        <ServiceProduct product={product()!} />
      </Show>
    </DefaultLayout>
  )
}

export default ProductDetail