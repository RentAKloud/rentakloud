import { createResource } from "solid-js";
import { Product, ProductPrice } from "~/types/product";
import ProductsApi from "~/api/products";

export const [products] = createResource<Product[]>(fetchAndRemix, {
  initialValue: []
})

export function getProductById(id: number) {
  return products.latest.find(p => p.id === id)
}

export function getProductPrice(product: Product, priceId?: string): ProductPrice {
  return priceId ? product.prices?.find(p => p.priceId === priceId)! : product.prices![0]
}

async function fetchAndRemix(): Promise<Product[]> {
  const _products = await ProductsApi.all()
  // const _slugs = _products.map(p => p.slug)
  // defaultProducts.forEach(p => {
  //   if (!_slugs.includes(p.slug)) {
  //     _products.push(p)
  //   }
  // })
  if (_products.error) {
    throw "Could not fetch products data"
  }

  return _products.result!
}