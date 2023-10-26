import { Component, For, createEffect, createSignal } from "solid-js";
import ChevronLeftIcon from "../icons/ChevronLeft";
import ChevronRightIcon from "../icons/ChevronRight";
import Carousel, { CarouselProps } from "./Carousel";

const CarouselWithControls: Component<CarouselProps> = (props) => {
  const [currSlide, setCurrSlide] = createSignal(0)
  const [inTransit, setInTransit] = createSignal(false)
  const isFirst = () => currSlide() === 0
  const isLast = () => props.items.length === 0 || currSlide() === props.items.length - 1

  function next() {
    setCurrSlide(x => x + 1)
    setInTransit(true)
  }

  function prev() {
    setCurrSlide(x => x - 1)
    setInTransit(true)
  }

  createEffect(() => {
    if (inTransit()) {
      setTimeout(() => setInTransit(false), 600)
    }
  })

  return (
    <div class="relative">
      <Carousel items={props.items} currSlide={currSlide()} />

      <div>
        <button onclick={prev} class="btn btn-circle absolute top-1/2 left-1" disabled={isFirst() || inTransit()}>
          <ChevronLeftIcon />
        </button>
        <button onclick={next} class="btn btn-circle absolute top-1/2 right-1" disabled={isLast() || inTransit()}>
          <ChevronRightIcon />
        </button>

        <div class="flex gap-4 justify-center mt-2">
          <For each={props.items}>
            {(_, i) => {
              return (
                <span
                  class="block rounded-full w-[10px] h-[10px] hover:border-2 hover:animate-pulse border-primary cursor-pointer"
                  classList={{
                    "bg-neutral": i() !== currSlide(),
                    "bg-primary": i() === currSlide()
                  }}
                  onclick={() => setCurrSlide(i())}
                />
              )
            }}
          </For>
        </div>
      </div>
    </div>
  )
}

export default CarouselWithControls