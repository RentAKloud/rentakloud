import { Component, JSXElement } from "solid-js";

type HeroWithFormProps = {
  children: JSXElement
  title: string
  subtitle: string
  inTransit?: boolean
}

const HeroWithForm: Component<HeroWithFormProps> = (props) => {
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row">
        <div class="text-center lg:text-left max-w-lg">
          <h1 class="text-5xl font-bold">{props.title}</h1>
          <p class="py-6">{props.subtitle}</p>
        </div>

        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body" classList={{ "animate-pulse": props.inTransit }}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroWithForm