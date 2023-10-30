import { Component, JSXElement } from "solid-js";

const Hero: Component<{
  title: string,
  subtitle: string,
  content?: JSXElement,
  children?: any,
  reverse?: boolean,
  centered?: boolean,
  actions?: JSXElement,
  fullScreen?: boolean
}> = (props) => {
  const { title, subtitle, content, children, actions, reverse = false, centered = false, fullScreen = true } = props

  return (
    <div
      class="hero bg-base-200 relative"
      classList={{
        "min-h-screen": fullScreen,
        "py-14": !fullScreen
      }}
    >
      <div
        class="hero-content flex-col text-center"
        classList={{
          'lg:flex-row': !reverse,
          'lg:flex-row-reverse': reverse,
          'lg:text-left': !centered
        }}>
        {/* <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" class="max-w-sm rounded-lg shadow-2xl" /> */}
        {children}
        <div class="max-w-xl">
          <h1 class="text-5xl font-bold">{title}</h1>
          <p class="py-6">{subtitle}</p>
          {content}

          {actions}
        </div>
      </div>
    </div>
  )
}

export default Hero