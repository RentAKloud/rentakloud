import { Component } from "solid-js";
import DefaultLayout from "../layouts/DefaultLayout";
import Hero from "../components/Hero/Hero";

const Services: Component<{}> = () => {
  return (
    <DefaultLayout>
      <Hero title="Services" centered subtitle="See everything we have to offer.">

      </Hero>
    </DefaultLayout>
  )
}

export default Services