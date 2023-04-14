import { Link } from "@solidjs/router";
import { Component, For, Show } from "solid-js";
import DefaultLayout from "../layouts/DefaultLayout";
import { cart } from "../stores/cart";

const Cart: Component = () => {
  return (
    <DefaultLayout>
      <h1 class="text-4xl font-bold">Your Cart</h1>

      <Show when={cart.items.length === 0}>
        Oh snap! Your cart is empty
      </Show>

      <For each={cart.items}>
        {(item) =>
          <div>{item.product.name} &cross; {item.quantity}</div>
        }
      </For>

      <Link href="/checkout" class="btn btn-primary">Checkout</Link>
    </DefaultLayout>
  )
}

export default Cart