import { Component, For, Match, Switch } from "solid-js";
import { Link } from "@solidjs/router";
import Card from "~/components/Card/Card";
import Testimonial from "~/components/Card/Testimonial";
import { home } from "~/config/data";
import { truncate } from "~/utils";
import HeroWithBg from "~/components/Hero/HeroWithBg";

const LandingHardwareFocused: Component = () => {

  return (
    <>
      <HeroWithBg
        title="Power Your Business With Our Cutting-Edge Tech"
        subtitle="Your One-Stop Shop for High-Performance Servers and Accessories."
        actions={
          <Link href="/register" class="btn btn-primary">Get Started</Link>
        }
        bgUrl="https://images.pexels.com/photos/6466141/pexels-photo-6466141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        class="h-[45vh] bg-fixed"
        notFullScreen
        align="left"
      >
        {/* <CloudsAnimation /> */}
        {/* <Lottie src="https://assets10.lottiefiles.com/packages/lf20_cgjrfdzx.json" /> */}
      </HeroWithBg>

      <section class="p-10 bg-base-200">
        <h2 class="text-3xl text-center font-bold mb-5">Popular Products</h2>
        <p class="text-center mb-10">Cutting-edge, high performance hardware. Intense computation with efficient energy usage.</p>

        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-center items-stretch">
          <For each={home().featuredHardware}>
            {
              (product) =>
                <Switch>
                  <Match when={product === undefined}>
                    <Card title="Loading..." />
                  </Match>

                  <Match when={!!product}>
                    <Card
                      title={product!.name}
                      description={truncate(product!.shortDescription || '', 120)}
                      img={{ uri: product!.images && product!.images[0] && product!.images![0].src || '', alt: `${product!.name} logo` }}
                      actions={
                        <Link href={`/our-products/${product!.slug}`} class="btn btn-primary">Learn More</Link>
                      }
                      class="w-96"
                    />
                  </Match>
                </Switch>
            }
          </For>
        </div>
      </section>

      <section class="p-10 bg-base-200">
        <h2 class="text-3xl text-center font-bold mb-5">Built Different</h2>
        <p class="text-center mb-10">Cutting-edge infrastructure. 100% Uptime. Automatic Backups.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center items-stretch gap-5">
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
            class="w-96"
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
            class="w-96"
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
            class="w-96"
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
            class="w-96"
            img={{ uri: "https://images.cloudclusters.io/1ebca492f6b84f04902f8f3aa89ac5ac/Tech%20Support%20for%20Open-Source%20Applications.png", alt: "" }}
          />
        </div>
      </section>

      <section class="py-10 flex flex-col items-center">
        <h2 class="text-3xl text-center font-bold mb-5">Testimonials</h2>
        <p class="text-center mb-10">Loved by all of our customers.</p>

        <div class="carousel w-64">
          <For each={home().testimonials}>
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
          <For each={home().testimonials}>
            {
              (_, i) =>
                <a href={`#item${i() + 1}`} class="btn btn-xs">{i() + 1}</a>
            }
          </For>
        </div>
      </section>
    </>
  )
}

export default LandingHardwareFocused