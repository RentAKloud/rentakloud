import { Component, For, Ref } from "solid-js";

export type CarouselProps = Component<{
  items: {
    src: string,
    alt: string,
  }[];
  ref?: Ref<HTMLDivElement>;
}>

const Carousel: CarouselProps = (props) => {
  return (
    <div class="carousel carousel-center rounded-box" ref={props.ref}>
      <For each={props.items}>
        {
          (item) =>
            <div class="carousel-item w-full">
              <img src={item.src} alt={item.alt} class="object-contain" />
            </div>
        }
      </For>
    </div>
  )
}

export default Carousel