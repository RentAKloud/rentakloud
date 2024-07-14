import { createMutable } from "solid-js/store";
import { CartItem, Product } from "../types/product";
import { getPlanPrice, getProductById, getProductPrice } from "./products";

const initialState = JSON.parse(
  localStorage.getItem("cart") || '{ "items": [] }',
);

const cart = createMutable<{
  items: CartItem[];
}>(initialState);

function addServiceToCart(
  item: Product,
  qty: number = 1,
  planId: number,
  priceId: string,
  isTrial: boolean = false,
) {
  const pi = cart.items.findIndex(
    (p) =>
      p.productId === item.id && p.planId === planId && p.priceId === priceId,
  );

  if (pi >= 0) {
    if (!isTrial) {
      cart.items[pi].quantity += qty;
    }
  } else {
    const cartItem: CartItem = {
      productId: item.id,
      quantity: qty,
      planId,
      priceId,
      configId: item.prices!.find((plans) =>
        plans.prices?.find((price) => price.priceId === priceId),
      )!.configId,
    };

    if (isTrial) cartItem.isTrial = isTrial;

    cart.items.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(item: Product, qty: number = 1) {
  const pi = cart.items.findIndex((p) => p.productId === item.id);

  if (pi >= 0) {
    cart.items[pi].quantity += qty;
  } else {
    const cartItem: CartItem = { productId: item.id, quantity: qty };
    cart.items.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(item: Product) {
  cart.items = cart.items.filter((p) => p.productId !== item.id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function incrQty(item: Product) {
  addToCart(item, 1);
}

function decrQty(item: Product) {
  addToCart(item, -1);
}

function resetCart() {
  cart.items = [];
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartTotal() {
  return cart.items
    .map((i) => {
      const p = getProductPrice(getProductById(i.productId)!, i.planId);
      const planPrice = i.isTrial
        ? 0
        : getPlanPrice(p, i.priceId!)?.amount || 0;
      return (p.saleAmount || p.amount || planPrice) * i.quantity;
    })
    .reduce((x, y) => x + y, 0);
}

export {
  cart,
  addToCart,
  addServiceToCart,
  removeFromCart,
  incrQty,
  decrQty,
  resetCart,
  getCartTotal,
};
