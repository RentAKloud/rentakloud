import { Component, onMount } from "solid-js";
import HeroWithBg from "~/components/Hero/HeroWithBg";
import Lottie from "~/components/Lottie";
import('@dotlottie/player-component')
import DefaultLayout from "~/layouts/DefaultLayout";

const Crash: Component<{ withoutLayout?: boolean }> = ({ withoutLayout }) => {
  onMount(() => {
    document.title = "Uncaught Error"
  })

  const internal = (
    <HeroWithBg
      title="Something went wrong"
      subtitle="Please try again later, or contact support@rentakloud.com"
    // actions={
    //   <div class="flex gap-5 justify-center">
    //     <button class="btn btn-active btn-accent">Learn More</button>
    //     <button class="btn btn-outline btn-primary">Get Started</button>
    //   </div>
    // }
    >
      <Lottie src="https://assets-v2.lottiefiles.com/a/b6490192-1152-11ee-adfa-739c076ac387/c6NdsIKhb9.lottie" />
    </HeroWithBg>
  )

  return (
    withoutLayout ? (
      <>{internal}</>
    ) : (
      <DefaultLayout title="Something went wrong">
        {internal}
      </DefaultLayout>
    )
  )
}

export default Crash