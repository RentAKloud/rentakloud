import { Component, For, createMemo, createSignal } from "solid-js";
import HeroWithBg from "../../components/Hero/HeroWithBg";
import { Product } from "../../types/product";
import PricingCard from "../../components/PricingCard";
import { addToCart } from "../../stores/cart";

export const ServiceProduct: Component<{ product: Product }> = (props) => {
  const [showYearly, setShowYearly] = createSignal(false)
  const product = createMemo(() => props.product)

  function selectPlan(priceId: string) {
    addToCart(product(), 1, priceId)
  }

  return (
    <>
      <HeroWithBg
        title={`Simple and Reliable ${props.product.name} Databases`}
        subtitle={`Worry-free ${props.product.name} hosting so you can focus on building great apps.`}
        header={<span class="uppercase">{props.product.categories.map(c => c.title).join(", ")}</span>}
        bgUrl="https://webimages.mongodb.com/_com_assets/cms/l4hecgagkqphn9kc9-ART.svg?ixlib=js-3.7.1&auto=format%2Ccompress&w=3038"
        align='left'
        contain
      >
      </HeroWithBg>

      <section class="text-center my-20">
        <h2 class="text-4xl mb-3">Deploy High-Performance {props.product.name} Clusters</h2>
        <h3 class="text-xl">Simplify the deployment and maintenance of-highly available {props.product.name} databases for your web applications.</h3>
      </section>

      <section class="p-10">
        <h2 class="text-3xl text-center font-bold mb-5">Pricing</h2>
        <p class="text-center mb-5">Choose the plan that fits your needs. No hidden fees. Hassle-free payments.</p>

        <div class="flex justify-center gap-8 mb-10">
          <span class="label-text">Show Yearly Prices</span>
          <input type="checkbox" class="toggle toggle-accent"
            checked={showYearly()} onChange={() => setShowYearly(!showYearly())}
          />
        </div>

        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          <For each={props.product.prices}>
            {
              (price, index) =>
                <PricingCard
                  planName={price.planName || `Plan ${index() + 1}`} ppm={price.amount} showYearly={showYearly}
                  points={[
                    "2.8 GHz 8-core CPU", "20 GB Cloud storage",
                    "Integration help", "SSH Access", "24×7 phone & email support"
                  ]}
                  submitHandler={() => selectPlan(price.priceId!)}
                />
            }
          </For>
        </div>
      </section>
    </>
  )
}