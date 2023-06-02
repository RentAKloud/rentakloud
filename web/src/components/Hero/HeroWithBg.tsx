import { Component, JSXElement } from "solid-js";

const HeroWithBg: Component<{
  title: string,
  subtitle: string,
  children?: JSXElement,
  bgUrl?: string,
  actions?: JSXElement,
  header?: JSXElement,
  contain?: boolean,
  align?: "center" | "left",
}> = (props) => {
  const { children, bgUrl, actions, header, contain, align = "center" } = props

  return (
    <div class="hero min-h-screen" classList={{
      'md:justify-items-start': align === 'left',
      'bg-right': align === 'left',
      'bg-contain': contain,
      'bg-no-repeat': contain,
    }} style={bgUrl ? `background-image: url(${bgUrl});` : ''}>
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content md:mx-32 flex-col md:flex-row" classList={{
        'md:text-left': align === 'left',
      }}>
        {children}
        <div class="max-w-md">
          {header}
          <h1 class="mb-5 text-5xl font-bold">{props.title}</h1>
          <p class="mb-5">{props.subtitle}</p>
          {actions}
        </div>
      </div>
    </div>
  )
}

export default HeroWithBg