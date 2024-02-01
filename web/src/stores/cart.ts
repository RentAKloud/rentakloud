import { createMutable } from "solid-js/store"
import { CartItem, Product } from "../types/product"
import { getPlanPrice, getProductById, getProductPrice } from "./products"

const initialState = JSON.parse(localStorage.getItem('cart') || '{ "items": [] }')

const cart = createMutable<{
  items: CartItem[]
}>(initialState)

function addToCart(item: Product, qty: number = 1, priceId?: string, isTrial?: boolean) {
  let pi = -1
  if (priceId) {
    pi = cart.items.findIndex(p => p.priceId === priceId)
  } else {
    pi = cart.items.findIndex(p => p.productId === item.id)
  }

  if (pi >= 0) {
    if (!isTrial) {
      cart.items[pi].quantity += qty
    }
  } else {
    const cartItem: CartItem = { productId: item.id, quantity: qty }
    if (priceId)
      cartItem.priceId = priceId
    if (isTrial)
      cartItem.isTrial = isTrial

    cart.items.push(cartItem)
  }

  localStorage.setItem('cart', JSON.stringify(cart))
}

function removeFromCart(item: Product) {
  cart.items = cart.items.filter(p => p.productId !== item.id)
  localStorage.setItem('cart', JSON.stringify(cart))
}

function incrQty(item: Product) {
  addToCart(item, 1)
}

function decrQty(item: Product) {
  addToCart(item, -1)
}

function resetCart() {
  cart.items = []
  localStorage.setItem('cart', JSON.stringify(cart))
}

function getCartTotal() {
  return cart.items
    .map(i => {
      const p = getProductPrice(getProductById(i.productId)!, i.priceId)
      const planPrice = i.isTrial ? 0 : getPlanPrice(p, i.priceId!)?.amount || 0
      return (p.saleAmount || p.amount || planPrice) * i.quantity
    })
    .reduce((x, y) => x + y, 0)
}

export {
  cart,
  addToCart,
  removeFromCart,
  incrQty,
  decrQty,
  resetCart,
  getCartTotal,
}