import { Component, For, createEffect } from "solid-js";

export type CarouselProps = {
  items: {
    src: string,
    alt: string,
    bg?: string,
  }[];
  currSlide?: number;
}

const Carousel: Component<CarouselProps> = (props) => {
  let carousel: HTMLDivElement | undefined;
  const currSlide = () => props.currSlide || 0

  function scrollIntoView(slide: number) {
    document.querySelector(`div.carousel-item:nth-child(${slide})`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" })
  }

  createEffect(() => {
    scrollIntoView(currSlide() + 1)
  })

  window.onresize = () => {
    scrollIntoView(currSlide() + 1)
  }

  return (
    <div class="flex overflow-hidden scroll-smooth rounded-box" ref={carousel}>
      <For each={props.items}>
        {(item) => {
          let customStyles = ''
          if (item.bg) customStyles += `background-color: ${item.bg};`

          return (
            <div class="carousel-item w-full" style={customStyles}>
              <img src={item.src} alt={item.alt} class="object-contain" />
            </div>
          )
        }}
      </For>
    </div>
  )
}

export default Carousel