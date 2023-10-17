import { Component, For, Show } from "solid-js";
import { Link } from "@solidjs/router";
import DefaultLayout from "~/layouts/DefaultLayout";
import { getCartTotal, cart, resetCart, incrQty, decrQty, removeFromCart } from "~/stores/cart";
import { getProductById, getProductPrice, products } from "~/stores/products";
import Loader from "~/components/Loader";
import { formatPrice } from "~/utils";
import TrashIcon from "~/components/icons/Trash";

const Cart: Component = () => {
  return (
    <DefaultLayout>
      <section class="min-h-screen bg-base-100 pt-32 md:px-20">
        <h1 class="text-4xl text-center font-bold mb-20">Your Cart</h1>

        <Show when={products.loading}>
          <div class="text-center">
            <Loader />
          </div>
        </Show>

        <Show when={cart.items.length === 0}>
          <p class="text-center">Oh snap! Your cart is empty</p>
        </Show>

        <Show when={cart.items.length > 0 && !products.loading}>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th class="w-fit text-center">Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <For each={cart.items}>
                  {(item, i) => {
                    const product = () => getProductById(item.productId)!

                    const price = () => getProductPrice(product(), item.priceId)
                    const total = () => price().amount * item.quantity
                    const interval = () => price().priceId ? ` &cross; ${price().planName} ${price().interval}ly` : ""
                    return (
                      <tr class="hover">
                        <th>{i() + 1}</th>
                        <td>{product().name}
                          <Show when={interval()}>
                            <span innerHTML={interval()}></span>
                          </Show>
                        </td>
                        <td class="flex gap-5 items-center justify-center">
                          <button
                            class="font-bold text-green-500 btn btn-ghost btn-circle"
                            onclick={() => incrQty(product())}
                            // disabled={item.quantity >= product().stock}
                          >
                            +
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            class="font-bold text-red-500 btn btn-ghost btn-circle"
                            onclick={() => decrQty(product())}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                        </td>
                        <td>{formatPrice(total())}</td>
                        <td>
                          <button class="btn btn-ghost btn-circle text-red-500" onclick={() => removeFromCart(product())}>
                            <TrashIcon />
                          </button>
                        </td>
                      </tr>
                    )
                  }}
                </For>

                <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td>{formatPrice(getCartTotal())}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-10 flex gap-5 justify-center">
            <button class="btn btn-error" onclick={resetCart}>Clear Cart</button>
            <Link href="/checkout" class="btn btn-primary">Checkout</Link>
          </div>
        </Show>
      </section>
    </DefaultLayout>
  )
}

export default Cart