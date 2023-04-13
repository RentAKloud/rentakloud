import { Tabs } from "@kobalte/core";
import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import Carousel from "../../components/Carousel";
import { Product } from "../../types/product";

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
  const product = () => props.product
  const price = () => {
    if ((product().prices || []).length > 0) {
      return product().prices![0]
    }

    return { amount: 0, currency: "USD", symbol: "$" }
  }

  return (
    <>
      <section>
        <div class="text-sm breadcrumbs m-5">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/our-products/?category=Hardware">Hardware</Link></li>
            <li>{product().name}</li>
          </ul>
        </div>
      </section>

      <section class="flex flex-col md:flex-row justify-around">
        <div class="md:w-2/5">
          <Carousel items={carData} />
        </div>

        <div class="md:w-2/5 mt-3 text-center md:text-left">
          <h1 class="text-3xl text-bold">{product().name}</h1>
          <p>{product().shortDescription}</p>

          <h4>{price().symbol}{price().amount} {price().currency}</h4>

          <button class="btn btn-primary">Buy</button>
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
            <Tabs.Content class="tabs__content" value="details">{product().description}</Tabs.Content>
            <Tabs.Content class="tabs__content" value="shipping">Shipping Info</Tabs.Content>
            <Tabs.Content class="tabs__content" value="reviews">Reviews</Tabs.Content>
          </div>
        </Tabs.Root>
      </section>
    </>
  )
}