import { Component, For } from "solid-js";
import Hero from "../../components/Hero/Hero";
import Card from "../../components/Card/Card"
import { products } from "../../config/data";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Link, useSearchParams } from "@solidjs/router";
import { productCategories, ProductCategory } from "../../types/product";

const Products: Component<{}> = () => {
  const [queryParams, setParams] = useSearchParams()
  const category = () => queryParams.category

  const filteredProducts = () => {
    const { category } = queryParams

    if (category) {
      return products.filter(p => p.categories.includes(category as ProductCategory))
    }

    return products
  }

  return (
    <DefaultLayout>
      <Hero
        title="Our Products"
        subtitle="Lightning Fast. Scalable & Secure. All Your Cloud Computing Needs In One Place."
        actions={
          <div class="flex flex-wrap justify-center gap-3">
            <button
              class="btn btn-accent" classList={{ 'btn-outline': !!category() }}
              onClick={() => setParams({ category: "" })}
            >
              All
            </button>
            <For each={productCategories}>
              {
                (c) =>
                  <button
                    class="btn btn-outline btn-accent"
                    classList={{ 'btn-outline': category() !== c }}
                    onClick={() => setParams({ category: c })}
                  >
                    {c}
                  </button>
              }
            </For>
          </div>
        }
        centered
      />

      <section class="flex flex-wrap gap-5">
        <For each={filteredProducts()}>
          {(product) => (
            <Link href={`/our-products/${product.slug}`}>
              <Card title={product.name} description={product.shortDescription} />
            </Link>
          )}
        </For>
      </section>
    </DefaultLayout>
  )
}

export default Products