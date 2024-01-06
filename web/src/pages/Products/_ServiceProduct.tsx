import { Component, For, createMemo, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import HeroWithBg from "~/components/Hero/HeroWithBg";
import { Product } from "~/types/product";
import PricingCard from "~/components/PricingCard";
import { addToCart } from "~/stores/cart";
import Accordion from "~/components/Accordion/Accordion";

export const ServiceProduct: Component<{ product: Product }> = (props) => {
  const [showYearly, setShowYearly] = createSignal(false)
  const product = createMemo(() => props.product)
  const category = () => product().categories[0]?.title || ""
  const navigate = useNavigate()

  function selectPlan(priceId: string) {
    addToCart(product(), 1, priceId)
    navigate("/checkout")
  }

  const title = () => product().meta.headerTitle || `Simple and Reliable ${product().name} ${category()}`
  const subTitle = () =>  product().meta.headerSubtitle ||`Worry-free ${product().name} hosting so you can focus on building great apps.`

  return (
    <>
      <HeroWithBg
        title={title()}
        subtitle={subTitle()}
        header={<span class="uppercase">{product().categories.map(c => c.title).join(", ")}</span>}
        bgUrl={product().images[0]?.src || ""}
        align='left'
        class="h-[30vh]"
        notFullScreen
        // contain
      >
      </HeroWithBg>

      <section class="text-center my-20">
        <h2 class="text-4xl mb-3">Deploy High-Performance {product().name} Clusters</h2>
        <h3 class="text-xl">Simplify the deployment and maintenance of-highly available {product().name} {category()} for your web applications.</h3>
      </section>

      <section class="p-10">
        <h2 class="text-3xl text-center font-bold mb-5">Pricing Plans that meet your unique personal and business needs​</h2>
        {/* <p class="text-center mb-5">Choose the plan that fits your needs. No hidden fees. Hassle-free payments.</p> */}

        <div class="flex justify-center gap-8 mb-10">
          <span class="label-text">Show Yearly Prices</span>
          <input type="checkbox" class="toggle toggle-accent"
            checked={showYearly()} onChange={() => setShowYearly(!showYearly())}
          />
        </div>

        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-center items-stretch">
          <For each={props.product.prices}>
            {
              (price, index) =>
                <PricingCard
                  planName={price.planName || `Plan ${index() + 1}`} ppm={price.amount} showYearly={showYearly}
                  points={price.features || [
                    "2.8 GHz 8-core CPU", "20 GB Cloud storage",
                    "Integration help", "SSH Access", "24×7 phone & email support"
                  ]}
                  submitHandler={() => selectPlan(price.priceId!)}
                />
            }
          </For>
        </div>
      </section>

      <section class="p-10">
        <h2 class="text-3xl text-center font-bold">FAQ</h2>
        <p class="text-center mb-12">Your frequently asked questions answered right here.</p>

        <div class="mx-20">
          <Accordion items={[
            {
              heading: "How do you ensure payments are secure?",
              body: "Payment security is our top priority. Encrypted payment details are stored in an external vault separate from our system. The vault has the highest PCI-DSS Level 1 compliance to ensure the highest security standards are met."
            },
            {
              heading: "What is your refund policy?",
              body: <>
                We offer a 30-day money back guarantee. For more information, please view
                our.
              </>
            },
            {
              heading: "Having issues making a payment?",
              body: `At , we make sure that all your payments reach us safely. If you’re having issues making a payment, you may contact us at support@rentakloud.com`
            }
          ]} />
        </div>
      </section>
    </>
  )
}