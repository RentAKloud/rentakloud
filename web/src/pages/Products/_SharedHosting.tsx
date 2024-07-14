import { useNavigate } from "@solidjs/router";
import {
  Component,
  ErrorBoundary,
  For,
  createMemo,
  createSignal,
} from "solid-js";
import Accordion from "~/components/Accordion/Accordion";
import HeroWithBg from "~/components/Hero/HeroWithBg";
import PricingCard from "~/components/PricingCard";
import { addServiceToCart } from "~/stores/cart";
import { Product } from "~/types/product";

export const SharedHosting: Component<{ product: Product }> = (props) => {
  const product = createMemo(() => props.product);
  const category = () => product().categories[0]?.title || "";
  const [showYearly, setShowYearly] = createSignal(false);
  const navigate = useNavigate();

  const title = () => product().meta.headerTitle || product().name;
  const subTitle = () =>
    product().meta.headerSubtitle || product().shortDescription;
  const secTitle = () =>
    product().meta.secondSecTitle ||
    `Deploy High-Performance ${product().name} Clusters`;
  const secContent = () =>
    product().meta.secondSecContent ||
    `Simplify the deployment and maintenance of-highly available ${product().name} ${category()} for your web applications.`;

  function selectPlan(planId: number, priceId: string) {
    addServiceToCart(product(), 1, planId, priceId);
    navigate("/checkout");
  }

  return (
    <>
      <HeroWithBg
        title={title()}
        subtitle={subTitle()}
        header={
          <span class="uppercase">
            {product()
              .categories.map((c) => c.title)
              .join(", ")}
          </span>
        }
        bgUrl={product().images[0]?.src || ""}
        align="left"
        bgFixed
        // class="h-[30vh]"
        notFullScreen
        // contain
      ></HeroWithBg>

      <section class="text-center mt-20">
        <h2 class="text-4xl mb-3">{secTitle()}</h2>
        <h3 class="text-xl" innerHTML={secContent()} />
      </section>

      {/* Pre sales ??? */}
      {/* <section class="text-center mb-10">
      <button class="btn btn-primary btn-lg mt-20" onclick={startTrial}>Start 7-day Trial</button>
    </section> */}

      <section class="p-10">
        <h2 class="text-3xl text-center font-bold mb-5">
          Pricing That Meets Your Personal & Business needs​
        </h2>
        <p class="text-center mb-5">
          Choose the plan that fits your needs. No hidden fees. Hassle-free
          payments.
        </p>

        <div class="flex justify-center gap-8 mb-10">
          <span class="label-text">Show Yearly Prices</span>
          <input
            type="checkbox"
            class="toggle toggle-accent"
            checked={showYearly()}
            onChange={() => setShowYearly(!showYearly())}
          />
        </div>

        <div class="flex flex-wrap justify-center items-stretch gap-10">
          <For each={product().prices}>
            {(plan, index) => (
              <ErrorBoundary
                fallback={(err) => {
                  console.log(err);
                  return "Something went wrong";
                }}
              >
                <PricingCard
                  index={index()}
                  plan={plan}
                  showYearly={showYearly}
                  submitHandler={(priceId) => selectPlan(plan.id!, priceId)}
                />
              </ErrorBoundary>
            )}
          </For>
        </div>
      </section>

      <section class="p-10">
        <h2 class="text-3xl text-center font-bold">FAQ</h2>
        <p class="text-center mb-12">
          Your frequently asked questions answered right here.
        </p>

        <div class="mx-20">
          <Accordion
            items={[
              {
                heading: "How do you ensure payments are secure?",
                body: "Payment security is our top priority. Encrypted payment details are stored in an external vault separate from our system. The vault has the highest PCI-DSS Level 1 compliance to ensure the highest security standards are met.",
              },
              {
                heading: "What is your refund policy?",
                body: (
                  <>
                    We offer a 30-day money back guarantee. For more
                    information, please view our.
                  </>
                ),
              },
              {
                heading: "Having issues making a payment?",
                body: `At , we make sure that all your payments reach us safely. If you’re having issues making a payment, you may contact us at support@rentakloud.com`,
              },
            ]}
          />
        </div>
      </section>
    </>
  );
};
