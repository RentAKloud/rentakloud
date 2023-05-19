import { Component, For, createResource } from "solid-js";
import ProductsApi from "../../api/products";
import Card from "../../components/Card/Card";
import { DateTime } from "../../components/DateTime";

const ActiveProducts: Component = () => {
  const [activeProducts] = createResource(ProductsApi.allMy)

  return (
    <>
      <h2 class="text-4xl font-bold mb-5">Active Products</h2>

      <section class="grid gap-5">
        <For each={activeProducts.latest} fallback="Nothing to see here.">
          {
            (activeProduct, index) => (
              <Card
                title={activeProduct.product.name}
                description={<div class="flex flex-col gap-5">
                  <p>{activeProduct.product.shortDescription}</p>
                  <span>Started At: <DateTime value={activeProduct.createdAt} /></span>
                </div>}
                actions={<div class="flex gap-5 items-center justify-start">
                  <span class="text-success" classList={{ "text-error": activeProduct.status === "Inactive" }}>{activeProduct.status}</span>
                  <button class="btn">Pause</button>
                </div>} />
            )
          }
        </For>
      </section>
    </>
  )
}

export default ActiveProducts