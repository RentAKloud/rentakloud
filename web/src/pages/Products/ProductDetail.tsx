import { useParams } from "@solidjs/router"
import { Component, createEffect, createMemo, Show } from "solid-js"
import HeroWithBg from "../../components/Hero/HeroWithBg"
import { products } from "../../config/data"
import DefaultLayout from "../../layouts/DefaultLayout"
import NotFound from "../error/NotFound"
import { ServiceProduct } from "./ServiceProduct"

const ProductDetail: Component<{}> = () => {
  const product = () => {
    const { slug } = useParams()
    return products.find(p => p.slug === slug)
  }
  const isAHarwareProduct = () => (product()?.categories || []).includes("Hardware")

  if (!product()) {
    return <NotFound />
  }

  return (
    <DefaultLayout>
      <Show when={isAHarwareProduct()}>
        <div>is a hardware product</div>
      </Show>

      <Show when={!isAHarwareProduct()}>
        <ServiceProduct product={product()!} />
      </Show>
    </DefaultLayout>
  )
}

export default ProductDetail