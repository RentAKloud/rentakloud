import { Component } from "solid-js";
// import('@dotlottie/player-component')

const Lottie: Component<{ src: string | any }> = ({ src }) => {
  return (
    <dotlottie-player
      src={src}
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px;"
      loop autoplay>
    </dotlottie-player>
  )
}

export default Lottie