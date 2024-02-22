import { ApiResponse, HttpService } from "~/services/HttpService";
import { Instance, Product, SubscriptionData } from "~/types/product";

class ProductsApi {
  static async all(): ApiResponse<Product[]> {
    return await HttpService.get("/products")
  }

  static async one(id: number): ApiResponse<Product> {
    return await HttpService.get(`/products/${id}`)
  }

  // TODO remove from here to instances
  static async instances(): ApiResponse<Instance[]> {
    return await HttpService.get("/instances")
  }

  static async instance(id: string): ApiResponse<Instance> {
    return await HttpService.get(`/instances/${id}`)
  }

  static async createActiveProducts(subscriptions: SubscriptionData[]) {
    return await HttpService.post("/instances", { subscriptions })
  }

  static async updateInstance(id:string, instance: Partial<Instance>) {
    return await HttpService.patch(`/instances/${id}`, instance)
  }

  static async deleteInstance(id: string) {
    return await HttpService.delete(`/instances/${id}`)
  }
}

export default ProductsApi