import { Component } from "solid-js";

const Lottie: Component<{ src: string | any }> = ({ src }) => {
  return (
    <lottie-player
      src={src}
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px;"
      loop autoplay>
    </lottie-player>
  )
}

export default Lottie