import { Component, For } from "solid-js";
import Hero from "../../components/Hero/Hero";
import Card from "../../components/Card/Card"
import { products } from "../../config/data";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Link, useSearchParams } from "@solidjs/router";
import { ProductCategory } from "../../types/product";

const Products: Component<{}> = () => {
  const [queryParams, setParams] = useSearchParams()
  
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
            <button class="btn btn-accent" onClick={() => setParams({ category: "" })}>All</button>
            <button class="btn btn-outline btn-accent" onClick={() => setParams({ category: "Hardware" })}>Hardware</button>
            <button class="btn btn-outline btn-accent">Databases</button>
            <button class="btn btn-outline btn-accent">ERP</button>
            <button class="btn btn-outline btn-accent">CRM</button>
            <button class="btn btn-outline btn-accent">CMS</button>
            <button class="btn btn-outline btn-accent">Ecommerce</button>
            <button class="btn btn-outline btn-accent">Message Queueing</button>
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