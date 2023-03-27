import { Component, JSXElement } from "solid-js";

const HeroWithForm: Component<{ children: JSXElement, title: string, subtitle: string }> = ({ children, title, subtitle }) => {
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row">
        <div class="text-center lg:text-left max-w-lg">
          <h1 class="text-5xl font-bold">{title}</h1>
          <p class="py-6">{subtitle}</p>
        </div>

        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroWithForm