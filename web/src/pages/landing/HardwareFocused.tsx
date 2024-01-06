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
        title={
          <>
            <h1>Cloud & Data Center</h1>
            <h1>Products And Services</h1>
          </>
        }
        subtitle="Efficient, Secure & Eco-friendly."
        // actions={
        //   <Link href="/register" class="btn btn-primary">Get Started</Link>
        // }
        bgUrl="https://images.pexels.com/photos/6466141/pexels-photo-6466141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        class="h-[60vh] md:h-[25vh] bg-fixed"
        notFullScreen
        align="left"
      >
        {/* <CloudsAnimation /> */}
        {/* <Lottie src="https://assets10.lottiefiles.com/packages/lf20_cgjrfdzx.json" /> */}
      </HeroWithBg>

      <section class="p-10 bg-base-200">
        {/* <h2 class="text-3xl text-center font-bold mb-5">Popular Products</h2> */}
        {/* <p class="text-center mb-10">Cutting-edge, high performance hardware. Intense computation with efficient energy usage.</p> */}

        <div class="flex flex-wrap gap-10 justify-center items-stretch">
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
          <h2 class="text-4xl font-bold mb-5">Why RentAKloud?</h2>
          <p class="text-lg">Our team with more than twenty-five years of experience is building solutions that address real needs and challenges.
            Our products and services help small businesses run their complete IT infrastructure in the cloud or help extend the current IT infrastructure with new servers and virtual machines.
            Data center providers can use our products to improve issue resolution and technology support.</p>
        </div>

        <div class="flex-1">
          <img class="h-[500px] w-full object-contain" src="https://i.imgur.com/jn025GT.jpg" />
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
          <img class="h-[500px] w-full object-contain" src="https://i.imgur.com/HcQN4CT.jpg" />
        </div>

        <div class="flex flex-col justify-center flex-1 p-10">
          <h2 class="text-4xl font-bold mb-5">What Makes Us Different?</h2>
          <p class="text-lg mb-10">We are committed to providing additional features and functionality compared to our competitors.
          We like to stay at the forefront of technology and put a lot of emphasis on research and development of our products and servers to benefit our customers.
          Our experienced team is committed to our continuous improvement process to offer solutions to problems others don't provide.</p>
        </div>
      </section>
    </>
  )
}

export default LandingHardwareFocused