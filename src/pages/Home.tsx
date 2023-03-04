import { Component, createSignal, For } from "solid-js";
import Card from "../components/Card/Card";
import Hero from "../components/Hero/Hero";
import CheckIcon from "../components/icons/Check";
import DefaultLayout from "../layouts/DefaultLayout";
import PricingCard from "../components/PricingCard";
import Testimonial from "../components/Card/Testimonial";
import Lottie from "../components/Lottie";

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

const runtimes = [
  {
    name: "NodeJS",
    description: "Fully managed, scalable hosting for NodeJS applications.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png"
  },
  {
    name: "Java",
    description: "Fully managed, scalable hosting for Java and JVM based languages. Run Tomcat, Springboot and more.",
    img: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo.png"
  },
  {
    name: "Ruby",
    description: "Fully managed, scalable hosting for Ruby/Rails.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1024px-Ruby_logo.svg.png"
  },
]

const testimonials = [
  {
    name: "Michal Jankowski",
    text: "Great service. loved it",
    img: "https://spectrum.ieee.org/media-library/ceo-of-comma-ai-george-geohot-hotz-speaks-onstage-during-techcrunch-disrupt-sf-2016-at-pier-48-on-september-13-2016-in-san-fr.jpg?id=25582060&width=980"
  },
  {
    name: "Clement Ivanov",
    text: "recommend to all",
    img: "https://about.me/cdn-cgi/image/q=80,dpr=1,f=auto,fit=cover,w=1200,h=630,gravity=0.314x0.177/https://assets.about.me/background/users/c/l/e/clementivanov_1548318087_406.jpg"
  },
  {
    name: "Steve Jobs",
    text: "excellent service",
    img: "https://cdn.britannica.com/04/171104-050-AEFE3141/Steve-Jobs-iPhone-2010.jpg"
  },
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
        <Lottie src="https://assets10.lottiefiles.com/packages/lf20_cgjrfdzx.json" />
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

      <section class="p-10 bg-base-200">
        <h2 class="text-3xl text-center font-bold mb-5">Popular Runtimes</h2>
        <p class="text-center mb-10">Cutting-edge infrastructure. 100% Uptime. Automatic Backups.</p>

        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-center items-stretch">
          <For each={runtimes}>
            {
              (rt) =>
                <Card
                  title={rt.name}
                  description={rt.description}
                  img={{ uri: rt.img, alt: `${rt.name} logo` }}
                  actions={
                    <button class="btn btn-primary">Learn More</button>
                  }
                />
            }
          </For>
        </div>
      </section>

      <section class="p-10 bg-base-200">
        <h2 class="text-3xl text-center font-bold mb-5">Built Different</h2>
        <p class="text-center mb-10">Cutting-edge infrastructure. 100% Uptime. Automatic Backups.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center items-stretch">
          <Card
            center
            title="Infrastructure"
            description={
              <ul>
                <li>World-Class Hardware</li>
                <li>Best Data Centers</li>
                <li>Crafted Cloud Platform</li>
                <li>Proactive Monitoring</li>
              </ul>
            }
            img={{ uri: "https://images.cloudclusters.io/57daa7380d554d859b7566b8b97be586/Infrastructure%20for%20CCS%20Cloud%20Hosting.png", alt: "" }}
          />

          <Card
            center
            title="High Speed"
            description={
              <ul>
                <li>Instant Deployment</li>
                <li>Top-tier Network</li>
                <li>Pure SSD</li>
              </ul>
            }
            img={{ uri: "https://images.cloudclusters.io/68465fbdf2774c0eae58e720ba76eb51/Speed%20Matters.png", alt: "" }}
          />

          <Card
            center
            title="Comprehensive Protection"
            description={
              <ul>
                <li>Auto-update</li>
                <li>Powerful Firewall</li>
                <li>SSL Everywhere</li>
                <li>Free Backup</li>
              </ul>
            }
            img={{ uri: "https://images.cloudclusters.io/128998bd6c8444988ba6374fac064693/Comprehensive%20Protection%20for%20Cloud%20Applications%20on%20CCS%20platform.png", alt: "" }}
          />

          <Card
            center
            title="Tech Support"
            description={
              <ul>
                <li>24/7 Support</li>
                <li>Free Migration</li>
              </ul>
            }
            img={{ uri: "https://images.cloudclusters.io/1ebca492f6b84f04902f8f3aa89ac5ac/Tech%20Support%20for%20Open-Source%20Applications.png", alt: "" }}
          />
        </div>
      </section>

      <section class="py-10">
        <h2 class="text-3xl text-center font-bold mb-5">Testimonials</h2>
        <p class="text-center mb-10">Loved by all of our customers.</p>

        <div class="carousel w-full">
          <For each={testimonials}>
            {
              (t, i) =>
                <div id={`item${i() + 1}`} class="carousel-item w-full justify-center">
                  <Testimonial
                    name={t.name}
                    text={t.text}
                    img={{ uri: t.img, alt: `${t.name} profile` }}
                  />
                </div>
            }
          </For>
        </div>
        <div class="flex justify-center w-full py-2 gap-2">
          <For each={testimonials}>
            {
              (_, i) =>
                <a href={`#item${i() + 1}`} class="btn btn-xs">{i() + 1}</a>
            }
          </For>
        </div>
      </section>
    </DefaultLayout>
  )
}

export default Home