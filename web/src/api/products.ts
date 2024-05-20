import { ApiResponse, HttpService } from "~/services/HttpService";
import { Product } from "~/types/product";
import { CreateInstanceReq } from "~/types/instance";
import { Instance } from "~/types/instance";

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

  static async createInstances(instances: CreateInstanceReq[]) {
    return await HttpService.post("/instances", { instances })
  }

  static async updateInstance(id:string, instance: Partial<Instance>) {
    return await HttpService.patch(`/instances/${id}`, instance)
  }

  static async deleteInstance(id: string) {
    return await HttpService.delete(`/instances/${id}`)
  }
}

export default ProductsApi