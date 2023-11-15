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
        class="h-[60vh] md:h-[45vh] bg-fixed"
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

      <section class="bg-base-200 flex flex-col-reverse md:flex-row md:py-10">
        <div class="flex flex-col justify-center flex-1 p-10">
          <h2 class="text-4xl font-bold mb-5">Why Depend On RentAKloud?</h2>
          <p class="text-lg">We specialize in transforming the seemingly impossible into reality. By integrating cutting-edge
            hardware, extensive industry expertise, and strategic ecosystem partnerships, we tackle the most intricate technology
            challenges of today.</p>
        </div>

        <div class="flex-1">
          <img class="w-full" src="https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=640&dpr=1" />
        </div>
      </section>

      <HeroWithBg
        title=""
        subtitle={`In a landscape saturated with options, RentAKloud stands out as the provider
        that not only delivers scalable solutions but also delivers on a promise of reliability, innovation, and unparalleled service.`}
        bgUrl="https://unsplash.com/photos/lVZjvw-u9V8/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8c2VydmVyc3xlbnwwfHx8fDE3MDAwMDE1MDl8MA&force=true&w=1920"
        class="h-[50vh]"
        notFullScreen
        bgFixed
      />

      <section class="bg-base-200 flex flex-col md:flex-row py-10">
        <div class="flex-1">
          <img class="w-full" src="https://unsplash.com/photos/6b5uqlWabB0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHNlcnZlciUyMGNwdSUyMHVuaXR8ZW58MHx8fHwxNjk5OTY5MTM3fDA&force=true&w=640" />
        </div>

        <div class="flex flex-col justify-center flex-1 p-10">
          <h2 class="text-4xl font-bold mb-5">What Makes Us Different?</h2>
          <p class="text-lg mb-10">What sets us apart is our unwavering commitment to providing a distinctive server solution
            experience. Unlike generic providers, we pride ourselves on staying at the forefront of technology trends, ensuring
            that our clients benefit from cutting-edge hardware and innovative configurations.</p>
        </div>
      </section>
    </>
  )
}

export default LandingHardwareFocused