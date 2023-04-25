import { createResource } from "solid-js";
import { defaultProducts } from "../config/data";
import { Product } from "../types/product";
import ProductsApi from "../api/products";

export const [products] = createResource<Product[]>(fetchAndRemix, {
  initialValue: defaultProducts
})

async function fetchAndRemix(): Promise<Product[]> {
  const _products = await ProductsApi.all()
  const prodSlugs = _products.map(p => p.slug)
  defaultProducts.forEach(p => {
    if (!prodSlugs.includes(p.slug)) {
      _products.push(p)
    }
  })

  return _products
}