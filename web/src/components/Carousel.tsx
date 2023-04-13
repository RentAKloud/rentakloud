import { Component, For } from "solid-js";

const Carousel: Component<{
  items: {
    src: string,
    alt: string,
  }[];
}> = ({ items }) => {
  return (
    <div class="carousel carousel-center rounded-box">
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