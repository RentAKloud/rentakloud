import { useParams } from "@solidjs/router"
import { Component, Show } from "solid-js"
import DefaultLayout from "~/layouts/DefaultLayout"
import { products } from "~/stores/products"
import NotFound from "~/pages/error/NotFound"
import { PhysicalProduct } from "./_PhysicalProduct"
import { ServiceProduct } from "./_ServiceProduct"
import { ProductType } from "~/types/product"

const ProductDetail: Component<{}> = () => {
  const product = () => {
    const { slug } = useParams()
    return products().find(p => p.slug === slug)
  }
  const isAHarwareProduct = () => product()?.productType === ProductType.Physical

  const title = () => {
    return isAHarwareProduct() ? product()?.name : `${product()?.name} ${product()?.categories[0].title} Hosting`
  }

  return (
    <DefaultLayout title={title()}>
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