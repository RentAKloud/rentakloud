import { Component, For, Ref } from "solid-js";

export type CarouselProps = Component<{
  items: {
    src: string,
    alt: string,
    bg?: string,
  }[];
  ref?: Ref<HTMLDivElement>;
}>

const Carousel: CarouselProps = (props) => {
  return (
    <div class="carousel carousel-center rounded-box h-96" ref={props.ref}>
      <For each={props.items}>
        {
          (item) => {
            let customStyles = ''
            if (item.bg) customStyles += `background-color: ${item.bg};`

            return (
              <div class="carousel-item w-full" style={customStyles}>
                <img src={item.src} alt={item.alt} class="object-contain" />
              </div>
            )
          }
        }
      </For>
    </div>
  )
}

export default Carousel