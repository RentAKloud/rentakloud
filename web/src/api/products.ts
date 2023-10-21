import { ApiResponse, HttpService } from "~/services/HttpService";
import { ActiveProduct, Product, SubscriptionData } from "~/types/product";

class ProductsApi {
  static async all(): ApiResponse<Product[]> {
    return await HttpService.get("/products")
  }

  static async one(id: number): ApiResponse<Product> {
    return await HttpService.get(`/products/${id}`)
  }

  static async allMy(): ApiResponse<ActiveProduct[]> {
    return await HttpService.get("/products/me")
  }

  static async createActiveProducts(subscriptions: SubscriptionData[]) {
    return await HttpService.post("/products/me", { subscriptions })
  }

  static async deleteActiveProduct(id: string) {
    return await HttpService.delete(`/products/me/${id}`)
  }
}

export default ProductsApi