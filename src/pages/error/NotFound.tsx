import { Component } from "solid-js";
import HeroWithBg from "../../components/Hero/HeroWithBg";
import DefaultLayout from "../../layouts/DefaultLayout";

const NotFound: Component = () => {
  return (
    <DefaultLayout>
      <HeroWithBg
        title="404 Not Found"
        subtitle="The page you were looking was not found."
        actions={
          <div class="flex gap-5 justify-center">
            <button class="btn btn-active btn-accent">Learn More</button>
            <button class="btn btn-outline btn-primary">Get Started</button>
          </div>
        }
      >
        <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_suhe7qtm.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></lottie-player>
      </HeroWithBg>
    </DefaultLayout>
  )
}

export default NotFound