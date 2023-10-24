import { Tabs } from "@kobalte/core";
import { Link } from "@solidjs/router";
import { Component, Match, Show, Switch, createMemo, createSignal } from "solid-js";
import CarouselWithControls from "~/components/Carousel/CarouselWithControls";
import TextInput from "~/components/Inputs/TextInput";
import { NotificationService } from "~/services/NotificationService";
import { addToCart, cart } from "~/stores/cart";
import { Product } from "~/types/product";
import { formatPrice } from "~/utils";

export const PhysicalProduct: Component<{ product: Product }> = (props) => {
  const product = createMemo(() => props.product)
  const price = () => {
    if (!product().prices || product().prices!.length === 0) {
      return null
    }

    return product().prices![0]
  }
  const [qty, setQty] = createSignal(1)

  function buy() {
    if (qty() === 0) return
    if (qty() + (cart.items.find(p => p.productId === product().id)?.quantity || 0) > product().stock) {
      NotificationService.error("Cannot add more than in stock")
      return
    }

    addToCart(product(), qty())

    NotificationService.info(<>{qty()} &cross; {product().name} Added to cart</>)
  }

  return (
    <>
      <section>
        <div class="text-sm breadcrumbs m-5">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href={`/our-products/?category=${product().categories[0]?.slug || ''}`}>{product().categories[0]?.title || 'Uncategorized'}</Link></li>
            <li>{product().name}</li>
          </ul>
        </div>
      </section>

      <section class="flex flex-col md:flex-row justify-around">
        <div class="md:w-2/5">
          <CarouselWithControls items={product().images} />
        </div>

        <div class="md:w-2/5 mt-3 text-center md:text-left">
          <h1 class="text-3xl text-bold">{product().name}</h1>
          <p class="my-5" innerHTML={product().shortDescription} />

          <Show when={price() !== null} fallback={"Not available for purchase right now. Please check back soon."}>
            <h4 class="text-xl mb-2">
              <span classList={{ "line-through": !!price()!.saleAmount }}>{formatPrice(price()!.amount)}</span>
              <Show when={price()!.saleAmount}>
                <br />{formatPrice(price()!.saleAmount!)}
                &nbsp;
                <span class="badge badge-secondary badge-lg dark:badge-outline">
                  -{Math.round((1 - price()!.saleAmount! / price()!.amount) * 100)}%
                </span>
              </Show>
            </h4>

            <Switch>
              <Match when={product().stock <= 0}>
                <h3 class="text-red-500">OUT OF STOCK</h3>
              </Match>
              <Match when={product().stock >= 1}>
                <h3 class="text-green-500">IN STOCK <small class="text-base-content opacity-70">{product().stock} left</small></h3>
              </Match>
            </Switch>

            <div class="w-1/2 mb-10 mx-auto md:mx-0">
              <TextInput
                label="Quantity"
                type="number" min={1} max={product().stock}
                value={qty().toString()}
                onChange={(e) => setQty(+e.currentTarget.value)}
              />
            </div>

            <button class="btn btn-primary" disabled={qty() === 0} onClick={buy}>Add to Cart</button>
          </Show>
        </div>
      </section>

      <section class="mt-5">
        {/* <Tabs.Root aria-label="Main navigation"> */}
        {/* <Tabs.List class="tabs">
            <Tabs.Trigger class="tab tab-bordered ui-selected:tab-active" value="details">Details</Tabs.Trigger>
            <Tabs.Trigger class="tab tab-bordered ui-selected:tab-active" value="shipping">Shipping</Tabs.Trigger>
            <Tabs.Trigger class="tab tab-bordered ui-selected:tab-active" value="reviews">Reviews</Tabs.Trigger> */}
        {/* <Tabs.Indicator class="tabs__indicator" /> */}
        {/* </Tabs.List> */}

        <div class="m-5 prose" innerHTML={product().description}>
          {/* <Tabs.Content class="tabs__content" value="details" innerHTML={product().description}></Tabs.Content>
            <Tabs.Content class="tabs__content" value="shipping">Shipping Info</Tabs.Content>
            <Tabs.Content class="tabs__content" value="reviews">Reviews</Tabs.Content> */}
        </div>
        {/* </Tabs.Root> */}
      </section>
    </>
  )
}