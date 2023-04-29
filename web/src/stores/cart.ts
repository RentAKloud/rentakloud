import { createMutable } from "solid-js/store"
import { CartItem, Product } from "../types/product"
import { getProductById } from "./products"

const initialState = JSON.parse(localStorage.getItem('cart') || '{ "items": [] }')

const cart = createMutable<{
  items: CartItem[]
}>(initialState)

function addToCart(item: Product, qty: number = 1) {
  const pi = cart.items.findIndex(p => p.productId = item.id)

  if (pi >= 0) {
    cart.items[pi].quantity += qty
  } else {
    cart.items.push({ productId: item.id, quantity: qty })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
}

function resetCart() {
  cart.items = []
  localStorage.setItem('cart', JSON.stringify(cart))
}

function getCartTotal() {
  return cart.items
    .map(i => getProductById(i.productId)!.prices![0].amount * i.quantity)
    .reduce((x, y) => x + y, 0)
}

export {
  cart,
  addToCart,
  resetCart,
  getCartTotal,
}