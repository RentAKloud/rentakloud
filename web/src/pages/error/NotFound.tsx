import { Component } from "solid-js";
import HeroWithBg from "../../components/Hero/HeroWithBg";
import Lottie from "../../components/Lottie";
import DefaultLayout from "../../layouts/DefaultLayout";

const NotFound: Component<{ withoutLayout?: boolean }> = ({ withoutLayout }) => {
  const internal = (
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
      <Lottie src="https://assets1.lottiefiles.com/packages/lf20_suhe7qtm.json" />
    </HeroWithBg>
  )

  return (
    withoutLayout ? (
      <>{internal}</>
    ) : (
      <DefaultLayout>
        {internal}
      </DefaultLayout>
    )
  )
}

export default NotFound