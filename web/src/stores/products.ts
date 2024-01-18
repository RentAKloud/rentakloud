import { createResource } from "solid-js";
import { PlanPrice, Product, ProductPrice } from "~/types/product";
import ProductsApi from "~/api/products";

export const [products] = createResource<Product[]>(fetchAndRemix, {
  initialValue: []
})

export function getProductById(id: number) {
  return products.latest.find(p => p.id === id)
}

export function getProductPrice(product: Partial<Product>, priceId?: string): ProductPrice {
  if (priceId) {
    return product.prices?.find(p => p.prices!.find(px => px.priceId === priceId))!
  }
  
  return product.prices![0]
}

export function getPlanPrice(plan: ProductPrice, priceId: string): PlanPrice|undefined {
  return plan.prices?.find(p => p.priceId === priceId)
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