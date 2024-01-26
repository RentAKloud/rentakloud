import { ApiResponse, HttpService } from "~/services/HttpService";
import { Instance, Product, SubscriptionData } from "~/types/product";

class ProductsApi {
  static async all(): ApiResponse<Product[]> {
    return await HttpService.get("/products")
  }

  static async one(id: number): ApiResponse<Product> {
    return await HttpService.get(`/products/${id}`)
  }

  static async instances(): ApiResponse<Instance[]> {
    return await HttpService.get("/products/me")
  }

  static async instance(id: string): ApiResponse<Instance> {
    return await HttpService.get(`/products/me/${id}`)
  }

  static async createActiveProducts(subscriptions: SubscriptionData[]) {
    return await HttpService.post("/products/me", { subscriptions })
  }

  static async updateInstance(id:string, instance: Partial<Instance>) {
    return await HttpService.patch(`/products/me/${id}`, instance)
  }

  static async deleteInstance(id: string) {
    return await HttpService.delete(`/products/me/${id}`)
  }
}

export default ProductsApi