import { Component, JSXElement } from "solid-js";

const HeroWithBg: Component<{
  title: string,
  subtitle: string,
  children?: JSXElement,
  bgUrl?: string,
  actions?: JSXElement
}> = ({ title, subtitle, children, bgUrl, actions }) => {
  return (
    <div class="hero min-h-screen" style={bgUrl ? `background-image: url(${bgUrl});` : ''}>
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        {children}
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">{title}</h1>
          <p class="mb-5">{subtitle}</p>
          {actions}
        </div>
      </div>
    </div>
  )
}

export default HeroWithBg