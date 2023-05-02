import { Link } from "@solidjs/router";
import { Component, For, Show } from "solid-js";
import DefaultLayout from "../layouts/DefaultLayout";
import { getCartTotal, cart, resetCart } from "../stores/cart";
import { getProductById } from "../stores/products";

const Cart: Component = () => {
  return (
    <DefaultLayout>
      <div class="min-h-screen text-center flex flex-col flex-1 place-content-center mx-20">
        <h1 class="text-4xl font-bold mb-10">Your Cart</h1>

        <Show when={cart.items.length === 0}>
          <p>Oh snap! Your cart is empty</p>
        </Show>

        <Show when={cart.items.length > 0}>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <For each={cart.items}>
                  {
                    ({ productId, quantity }, i) => {
                      const product = () => getProductById(productId)!

                      const price = () => product().prices![0]
                      const total = () => price().amount * quantity
                      return (
                        <tr>
                          <th>{i() + 1}</th>
                          <td>{product().name}</td>
                          <td>{quantity}</td>
                          <td>{total()} {price().currency}</td>
                        </tr>
                      )
                    }
                  }
                </For>

                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td>{getCartTotal()} {getProductById(cart.items[0].productId)!.prices![0].currency}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-10 flex gap-5 justify-center">
            <button class="btn btn-error" onclick={resetCart}>Clear Cart</button>
            <Link href="/checkout" class="btn btn-primary">Checkout</Link>
          </div>
        </Show>
      </div>
    </DefaultLayout>
  )
}

export default Cart