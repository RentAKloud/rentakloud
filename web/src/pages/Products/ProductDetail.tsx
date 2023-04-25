import { useParams } from "@solidjs/router"
import { Component, Show } from "solid-js"
import DefaultLayout from "../../layouts/DefaultLayout"
import NotFound from "../error/NotFound"
import { PhysicalProduct } from "./_PhysicalProduct"
import { ServiceProduct } from "./_ServiceProduct"
import { products } from "../../stores/products"

const ProductDetail: Component<{}> = () => {
  const product = () => {
    const { slug } = useParams()
    return products().find(p => p.slug === slug)
  }
  const isAHarwareProduct = () => (product()?.categories || []).map(c => c.slug).includes("hardware")

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