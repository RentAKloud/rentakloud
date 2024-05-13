import { Component, For, Match, Switch } from "solid-js";
import { Link } from "@solidjs/router";
import Card from "~/components/Card/Card";
import { home } from "~/config/data";
import { truncate } from "~/utils";
import HeroWithBg from "~/components/Hero/HeroWithBg";
import CardSkeleton from "~/components/Card/CardSkeleton";
import { products } from "~/stores/products";

const LandingMixed: Component = () => {

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
        <div class="mb-10">
          <h2 class="text-4xl text-center font-bold mb-5">Explore Our Cloud Products</h2>
          {/* <p class="text-center">Cutting-edge, high performance hardware. Intense computation with efficient energy usage.</p> */}
        </div>
        <div class="flex flex-wrap gap-10 justify-center items-stretch">
          <For each={home().featuredServices}>
            {
              (product) =>
                <Switch>
                  <Match when={products.loading && product === undefined}>
                    <CardSkeleton class="w-96" rowClass="h-8" rows={4} />
                  </Match>

                  <Match when={!!product}>
                    <Card
                      title={product!.name}
                      description={truncate(product!.shortDescription || '', 120)}
                      // img={{ uri: product!.images && product!.images[0] && product!.images![0].src || '', alt: `${product!.name} logo` }}
                      actions={
                        <Link href={`/our-products/${product!.slug}`} class="btn btn-primary">Learn More</Link>
                      }
                      class="w-96"
                      actionsAlign="left"
                      hasGradientShadow
                    />
                  </Match>
                </Switch>
            }
          </For>
        </div>
      </section>

      <section class="p-10 bg-base-200">
        <div class="mb-10">
          <h2 class="text-4xl text-center font-bold mb-5">Our Products</h2>
          <p class="text-center">For businesses with on-premises requirements. Cutting-edge, high performance hardware.</p>
        </div>

        <div class="flex flex-wrap gap-10 justify-center items-stretch">
          <For each={home().featuredHardware}>
            {
              (product) =>
                <Switch>
                  <Match when={product === undefined}>
                    <CardSkeleton class="w-96" rowClass="h-8" rows={4} />
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

      <section class="bg-base-200 flex flex-col-reverse md:flex-row-reverse md:py-10">
        <div class="flex flex-col justify-center flex-1 p-10">
          <h2 class="text-4xl font-bold mb-4">Want To Be Our Partners?</h2>
          <p class="text-lg mb-4">Investing in cloud can go a long way. The global cloud computing market size was valued
            at over $500 billion in 2023. And it is expected to reach ~$2 trillion USD by 2030.</p>
          <p class="text-lg mb-4">Businesses are already looking for alternatives to big giants like AWS, Azure, GCP.
            Join our hands to build the cloud platform for future.</p>
          <div class="flex gap-4">
            <a target="_blank" href="https://cdn.rentakloud.com/rak-franchise-flyer.pdf" class="btn btn-primary">Learn More</a>
            <a href="/support" class="btn btn-outline btn-primary">Contact Us</a>
          </div>
        </div>

        <div class="flex-1">
          <img class="h-[500px] w-full object-contain" src="https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
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

export default LandingMixed