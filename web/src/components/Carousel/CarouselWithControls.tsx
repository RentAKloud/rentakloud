import ChevronLeftIcon from "../icons/ChevronLeft";
import ChevronRightIcon from "../icons/ChevronRight";
import Carousel, { CarouselProps } from "./Carousel";

const CarouselWithControls: CarouselProps = ({ items }) => {
  let carousel: HTMLDivElement | undefined;

  function next() {
    carousel?.scrollBy(10, 0)
  }

  function prev() {
    carousel?.scrollBy(-10, 0)
  }

  return (
    <div class="relative">
      <Carousel ref={carousel} items={items} />

      <div>
        <button onclick={prev} class="btn btn-circle absolute top-1/2 left-1">
          <ChevronLeftIcon />
        </button>
        <button onclick={next} class="btn btn-circle absolute top-1/2 right-1">
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}

export default CarouselWithControls