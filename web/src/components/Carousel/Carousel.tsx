import { Component, For, Ref, createEffect, createSignal } from "solid-js";

export type CarouselProps = Component<{
  items: {
    src: string,
    alt: string,
    bg?: string,
  }[];
  currSlide: number;
}>

const Carousel: CarouselProps = (props) => {
  let carousel: HTMLDivElement | undefined;
  const [prevSlide, setPrevSlide] = createSignal(props.currSlide)

  createEffect(() => {
    const diff = props.currSlide - prevSlide()
    const n = Math.abs(diff)
    const dir = diff/n
    
    for (let i = 0; i < n; i++)
      setTimeout(() => carousel?.scrollBy(10 * dir, 0), 600 * i)

    setPrevSlide(props.currSlide)
  })

  return (
    <div class="carousel carousel-center rounded-box" ref={carousel}>
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