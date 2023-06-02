import { createResource } from "solid-js";
import { defaultProducts } from "../config/data";
import { Product, ProductPrice } from "../types/product";
import ProductsApi from "../api/products";

export const [products] = createResource<Product[]>(fetchAndRemix, {
  initialValue: defaultProducts
})

export function getProductById(id: number) {
  return products.latest.find(p => p.id === id)
}

export function getProductPrice(product: Product, priceId?: string): ProductPrice {
  return priceId ? product.prices?.find(p => p.priceId === priceId)! : product.prices![0]
}

export function formatPrice(amount: number, currency = 'usd') {
  const f = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  })

  return `${f.format(amount)} ${currency.toUpperCase()}`
}

async function fetchAndRemix(): Promise<Product[]> {
  try {
    const _products = await ProductsApi.all()
    const _slugs = _products.map(p => p.slug)
    defaultProducts.forEach(p => {
      if (!_slugs.includes(p.slug)) {
        _products.push(p)
      }
    })
  
    return _products
  } catch (err) {
    console.error("Could not fetch products data")
    return defaultProducts
  }
}