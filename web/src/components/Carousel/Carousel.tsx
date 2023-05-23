import { Component, For, Ref } from "solid-js";

export type CarouselProps = Component<{
  items: {
    src: string,
    alt: string,
  }[];
  ref?: Ref<HTMLDivElement>;
}>

const Carousel: CarouselProps = (props) => {
  const { items } = props

  return (
    <div class="carousel carousel-center rounded-box" ref={props.ref}>
      <For each={items}>
        {
          (item) =>
            <div class="carousel-item w-full">
              <img src={item.src} alt={item.alt} />
            </div>
        }
      </For>
    </div>
  )
}

export default Carousel