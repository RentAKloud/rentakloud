import { Component } from "solid-js";
import DefaultLayout from "../layouts/DefaultLayout";
import LandingMixed from "./landing/Mixed";

const Home: Component = () => {

  return (
    <DefaultLayout>
      <LandingMixed />
    </DefaultLayout>
  )
}

export default Home