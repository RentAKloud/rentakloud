import { HttpService } from "../services/HttpService";
import { ActiveProduct, Product, SubscriptionData } from "../types/product";

class ProductsApi {
  static async all(): Promise<Product[]> {
    return await HttpService.get("/products")
  }

  static async one(id: number): Promise<Product> {
    return await HttpService.get(`/products/${id}`)
  }

  static async allMy(): Promise<ActiveProduct[]> {
    return await HttpService.get("/products/me")
  }

  static async createActiveProducts(subscriptions: SubscriptionData[]) {
    return await HttpService.post("/products/me", { subscriptions })
  }
}

export default ProductsApi