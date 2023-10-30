import { Component } from "solid-js";
import DefaultLayout from "../layouts/DefaultLayout";
// import LandingInitial from "./landing/Initial";
import LandingHardwareFocused from "./landing/HardwareFocused";

const Home: Component = () => {

  return (
    <DefaultLayout>
      <LandingHardwareFocused />
    </DefaultLayout>
  )
}

export default Home