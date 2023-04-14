import { createMutable } from "solid-js/store"
import { Product } from "../types/product"

const initialState = {
  items: []
}

const cart = createMutable<{
  items: {
    product: Product;
    quantity: number;
  }[]
}>(initialState)

function addToCart(item: Product, qty: number = 1) {
  const pi = cart.items.findIndex(p => p.product.id = item.id)

  if (pi >= 0) {
    cart.items[pi].quantity += qty
  } else {
    cart.items.push({ product: item, quantity: qty })
  }
}

export {
  cart,
  addToCart,
}