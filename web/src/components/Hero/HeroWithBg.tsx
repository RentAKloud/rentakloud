import { Component, Show } from "solid-js";
import { HeroWithBgProps } from "~/types/ui";

const HeroWithBg: Component<HeroWithBgProps> = (props) => {
  const { children, actions, header, contain, align = "center" } = props

  return (
    <div class={`hero h-[70vh] ${props.class || ''}`} classList={{
      'min-h-screen': !props.notFullScreen,
      'md:justify-items-start': align === 'left',
      'bg-right': align === 'left',
      'bg-contain': contain,
      'bg-no-repeat': contain,
      'bg-fixed': props.bgFixed,
    }} style={props.bgUrl ? `background-image: url(${props.bgUrl});` : ''}>
      <Show when={props.bgUrl}>
        <div class="hero-overlay bg-opacity-90"></div>
      </Show>

      <div class="hero-content text-center md:mx-32 flex-col md:flex-row" classList={{
        'md:text-left': align === 'left',
        'text-neutral-content': !!props.bgUrl
      }}>
        {children}
        <div class="max-w-md">
          {header}
          <Show when={props.title}>
            <h1 class="mb-5 text-5xl font-bold">{props.title}</h1>
          </Show>
          <Show when={props.subtitle}>
            <p class="mb-5 text-xl">{props.subtitle}</p>
          </Show>
          {actions}
        </div>
      </div>
    </div>
  )
}

export default HeroWithBg