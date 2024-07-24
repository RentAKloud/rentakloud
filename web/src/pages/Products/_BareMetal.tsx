import { useNavigate } from "@solidjs/router";
import {
  Component,
  ErrorBoundary,
  For,
  createMemo,
  createSignal,
} from "solid-js";
import Accordion from "~/components/Accordion/Accordion";
import Card from "~/components/Card/Card";
import HeroWithBg from "~/components/Hero/HeroWithBg";
import PricingCard from "~/components/PricingCard";
import { addServiceToCart } from "~/stores/cart";
import { Product } from "~/types/product";

export const BareMetal: Component<{ product: Product }> = (props) => {
  const product = createMemo(() => props.product);
  const category = () => product().categories[0]?.title || "";
  const [showYearly, setShowYearly] = createSignal(false);
  const navigate = useNavigate();

  const title = () => product().meta.headerTitle || product().name;
  const subTitle = () =>
    product().meta.headerSubtitle || product().shortDescription;

  function selectPlan(planId: number, priceId: string) {
    addServiceToCart(product(), 1, planId, priceId);
    navigate("/checkout");
  }

  function startTrial() {}

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

      <section class="text-center mt-20 container mx-auto">
        <h2 class="text-4xl mb-3">Dream Big. Make It Happen.</h2>
        <h3 class="text-xl" innerHTML={product().description} />
      </section>

      {/* Pre sales ??? */}
      <section class="text-center mb-10">
        <button class="btn btn-primary btn-lg mt-20" onclick={startTrial}>
          Start 7-day Trial
        </button>
      </section>

      <section class="p-10">
        <h2 class="text-3xl text-center font-bold mb-5">
          Pricing That You'll Love
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
            name="show-yearly"
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

      <section class="container m-auto">
        <div class="p-20">
          <div class="text-center px-40 mb-10">
            <h2 class="text-4xl font-bold mb-4">
              Benefits to activate the builder in you
            </h2>
            <p class="">
              From simple tools and predictable pricing to support designed for
              growing businesses, RentAKloud's cloud is built to serve the
              unique needs of startups and SMBs.
            </p>
          </div>

          <div class="flex flex-wrap justify-center items-stretch gap-10">
            <Card
              title="Build and ship faster using simple tools"
              class="w-1/3"
              img={{
                uri: "//cdn.rentakloud.com/icons/Streamline-Ship.svg",
                alt: "ship icon",
              }}
            >
              <p class="">
                All of our products are built with simplicity at their core, so
                you can spend your time focusing on building apps, not
                infrastructure.
              </p>
            </Card>

            <Card
              title="Grow profitably with fixed cloud costs"
              class="w-1/3"
              img={{
                uri: "//cdn.rentakloud.com/icons/Streamline-Lucky-cat-money.svg",
                alt: "treasure icon",
              }}
            >
              <p class="">
                Our fixed pricing and leading price-to-performance ratio
                contribute to an ROI of 187%. Now you never have to worry about
                insane cloud bills or any hidden costs.
              </p>
            </Card>

            <Card
              title="Reduce your roadblocks with dedicated support"
              class="w-1/3"
              img={{
                uri: "//cdn.rentakloud.com/icons/Streamline-Customer-service-woman.svg",
                alt: "support icon",
              }}
            >
              <p class="">
                Get free, personalized support or upgrade to paid plans to
                receive dedicated help and faster response times.
              </p>
            </Card>

            <Card
              title="Improve customer experience by building on a reliable platform"
              class="w-1/3"
              img={{
                uri: "//cdn.rentakloud.com/icons/Streamline-Programmer-male.svg",
                alt: "customer experience icon",
              }}
            >
              <p class="">
                Deliver superior customer experience with our globally
                distributed platform, minimal downtime, and intuitive products.
              </p>
            </Card>
          </div>
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
