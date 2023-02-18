import { children, Component, JSXElement } from "solid-js";

const Hero: Component<{
  title: string,
  subtitle: string,
  content?: JSXElement,
  children?: any,
  reverse?: boolean
}> = ({ title, subtitle, content, children, reverse = false }) => {
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class={`hero-content flex-col lg:flex-row${reverse ? '-reverse' : ''}`}>
        {/* <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" class="max-w-sm rounded-lg shadow-2xl" /> */}
        {children}
        <div class="max-w-xl">
          <h1 class="text-5xl font-bold">{title}</h1>
          <p class="py-6">{subtitle}</p>
          {content}
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Hero