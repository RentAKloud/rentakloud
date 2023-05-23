import { Tabs } from "@kobalte/core";
import { Link } from "@solidjs/router";
import { Component, Show, createMemo, createSignal } from "solid-js";
import CarouselWithControls from "../../components/Carousel/CarouselWithControls";
import FormInput from "../../components/FormInput";
import { NotificationService } from "../../services/NotificationService";
import { addToCart } from "../../stores/cart";
import { Product } from "../../types/product";
import { formatPrice } from "../../stores/products";

const carData = [
  {
    src: "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/1968/7031/Plus-1__34215.1674847345.1280.1280__92699.1675093557.jpg?c=2",
    alt: "bluej"
  },
  {
    src: "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/1968/7032/Plus-2__79690.1674847358.1280.1280__03489.1675093573.jpg?c=2",
    alt: "bluej"
  },
  {
    src: "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/1968/7033/Plus-3__42612.1674847369.1280.1280__06848.1675093585.jpg?c=2",
    alt: "bluej"
  }
]

export const PhysicalProduct: Component<{ product: Product }> = (props) => {
  const product = createMemo(() => props.product)
  const price = () => {
    if (!product().prices || product().prices!.length === 0) {
      return null
    }

    return product().prices![0]
  }
  const [qty, setQty] = createSignal(0)

  function buy() {
    if (qty() === 0) return

    addToCart(product(), qty())

    NotificationService.info(<>{qty()} &cross; {product().name} Added to cart</>)
  }

  return (
    <>
      <section>
        <div class="text-sm breadcrumbs m-5">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href={`/our-products/?category=${product().categories[0].slug}`}>{product().categories[0].title}</Link></li>
            <li>{product().name}</li>
          </ul>
        </div>
      </section>

      <section class="flex flex-col md:flex-row justify-around">
        <div class="md:w-2/5">
          <CarouselWithControls items={carData} />
        </div>

        <div class="md:w-2/5 mt-3 text-center md:text-left">
          <h1 class="text-3xl text-bold">{product().name}</h1>
          <p class="my-5" innerHTML={product().shortDescription} />

          <Show when={price() !== null} fallback={"Not available for purchase right now. Please check back soon."}>
            <h4 class="text-xl">{formatPrice(price()!.amount)}</h4>

            <div class="w-1/2 mb-10">
              <FormInput label="Quantity" type="number" min={1} value={qty().toString()} onChange={(newVal) => setQty(+newVal)} />
            </div>

            <button class="btn btn-primary" disabled={qty() === 0} onClick={buy}>Add to Cart</button>
          </Show>
        </div>
      </section>

      <section class="mt-5">
        <Tabs.Root aria-label="Main navigation">
          <Tabs.List class="tabs">
            <Tabs.Trigger class="tab tab-bordered ui-selected:tab-active" value="details">Details</Tabs.Trigger>
            <Tabs.Trigger class="tab tab-bordered ui-selected:tab-active" value="shipping">Shipping</Tabs.Trigger>
            <Tabs.Trigger class="tab tab-bordered ui-selected:tab-active" value="reviews">Reviews</Tabs.Trigger>
            {/* <Tabs.Indicator class="tabs__indicator" /> */}
          </Tabs.List>

          <div class="m-5">
            <Tabs.Content class="tabs__content" value="details" innerHTML={product().description}></Tabs.Content>
            <Tabs.Content class="tabs__content" value="shipping">Shipping Info</Tabs.Content>
            <Tabs.Content class="tabs__content" value="reviews">Reviews</Tabs.Content>
          </div>
        </Tabs.Root>
      </section>
    </>
  )
}