import { Component } from "solid-js";
import DefaultLayout from "../layouts/DefaultLayout";
import Hero from "../components/Hero/Hero";

const Support: Component<{}> = () => {
  return (
    <DefaultLayout>
      <Hero title="Help & Support" centered subtitle="Find all the help you need here">

      </Hero>
    </DefaultLayout>
  )
}

export default Support