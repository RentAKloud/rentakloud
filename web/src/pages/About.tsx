import { Component } from "solid-js";
import Hero from "../components/Hero/Hero";
import DefaultLayout from "../layouts/DefaultLayout";

const About: Component = () => {
  return (
    <DefaultLayout>
      <Hero title="About Us" subtitle="Premium Bare Metal Cloud Hosting & Managed Applications">

      </Hero>
    </DefaultLayout>
  )
}

export default About