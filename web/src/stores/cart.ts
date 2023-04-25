import { createMutable } from "solid-js/store"
import { CartItem, Product } from "../types/product"

const initialState = JSON.parse(localStorage.getItem('cart') || '{ items: [] }')

const cart = createMutable<{
  items: CartItem[]
}>(initialState)

function addToCart(item: Product, qty: number = 1) {
  const pi = cart.items.findIndex(p => p.product.id = item.id)

  if (pi >= 0) {
    cart.items[pi].quantity += qty
  } else {
    cart.items.push({ product: item, quantity: qty })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
}

function resetCart() {
  cart.items = []
  localStorage.setItem('cart', JSON.stringify(cart))
}

export {
  cart,
  addToCart,
  resetCart,
}