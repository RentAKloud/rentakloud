import { Component, createSignal, For } from "solid-js";
import Card from "../components/Card";
import Hero from "../components/Hero/Hero";
import CheckIcon from "../components/icons/Check";
import DefaultLayout from "../layouts/DefaultLayout";
import PricingCard from "../components/PricingCard";

const products = [
  {
    name: "PostgresQL",
    description: "Fully managed, scalable hosting for PostgresQL database.",
    img: "https://1000logos.net/wp-content/uploads/2020/08/PostgreSQL-Logo.png"
  },
  {
    name: "MySQL",
    description: "Fully managed, scalable hosting for MySQL database.",
    img: "https://upload.wikimedia.org/wikipedia/fr/thumb/6/62/MySQL.svg/1200px-MySQL.svg.png"
  },
  {
    name: "CockroachDB",
    description: "Fully managed, scalable hosting for Cockroach database.",
    img: "https://connect.redhat.com/s3api/prod-s3api/1629218071-logo-url-5e9872712989e6a90307acd6.png"
  },
  {
    name: "Redis",
    description: "Fully managed, scalable hosting for Redis datastore.",
    img: "https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg"
  },
  {
    name: "RabbitMQ",
    description: "Fully managed, scalable hosting for RabbitMQ message queuing system.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/RabbitMQ_logo.svg/2560px-RabbitMQ_logo.svg.png"
  },
  {
    name: "Wordpress",
    description: "Fully managed, scalable hosting for Wordpress to fulfill all your blogging and ecommerce needs",
    img: "https://1000logos.net/wp-content/uploads/2023/01/WordPress-logo.png"
  }
]

const Home: Component = () => {
  const [showYearly, setShowYearly] = createSignal(false)

  return (
    <DefaultLayout>
      <Hero
        title="Scale Your Business With Professional Web Hosting"
        subtitle="Lightning Fast. Scalable & Secure. All Your Cloud Computing Needs In One Place."
        content={
          <ul class="mb-5">
            <li><CheckIcon success={true} /> Blazingly Fast</li>
            <li><CheckIcon success={true} /> Fully Managed</li>
            <li><CheckIcon success={true} /> Free SSL</li>
            <li><CheckIcon success={true} /> 24/7 Support</li>
          </ul>
        }
        reverse
      >
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_cgjrfdzx.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player>
      </Hero>

      <section class="p-10 bg-base-200">
        <h2 class="text-3xl text-center font-bold mb-5">Popular Products</h2>
        <p class="text-center mb-10">In-demand open source applications. Deploy an instance in seconds. Get started right away.</p>

        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-center items-stretch">
          <For each={products}>
            {
              (product) =>
                <Card
                  title={product.name}
                  description={product.description}
                  img={{ uri: product.img, alt: `${product.name} logo` }}
                  actions={
                    <button class="btn btn-primary">Learn More</button>
                  }
                />
            }
          </For>
        </div>
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
          <PricingCard
            planName="Basic Plan" ppm={5} showYearly={showYearly}
            points={[
              "2.8 GHz 8-core CPU", "20 GB Cloud storage",
              "Integration help", "SSH Access", "24×7 phone & email support"
            ]}
          />
          <PricingCard
            planName="Standard Plan" ppm={15} showYearly={showYearly}
            points={[
              "3.4 GHz 8-core CPU", "50 GB Cloud storage",
              "Integration help", "SSH Access", "24×7 phone & email support"
            ]}
          />
          <PricingCard
            planName="Enterprise" ppm={50} showYearly={showYearly}
            points={[
              "4 GHz 16-core CPU", "200 GB Cloud storage",
              "Integration help", "SSH Access", "24×7 phone & email support"
            ]}
          />
        </div>
      </section>

      <section class="p-10">
        <h2 class="text-3xl text-center font-bold mb-5">Popular Runtimes</h2>
        <p class="text-center mb-10">Cutting-edge infrastructure. 100% Uptime. Automatic Backups.</p>
      </section>

      <section class="p-10">
        <h2 class="text-3xl text-center font-bold mb-5">Built Different</h2>
        <p class="text-center mb-10">Cutting-edge infrastructure. 100% Uptime. Automatic Backups.</p>
      </section>

      <section>
        <h2 class="text-3xl text-center font-bold mb-5">Testimonials</h2>
        <p class="text-center mb-10">Loved by all of our customers.</p>
      </section>
    </DefaultLayout>
  )
}

export default Home