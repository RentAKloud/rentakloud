import { ApiResponse, HttpService } from "~/services/HttpService";
import { Product } from "~/types/product";

class ProductsApi {
  static async all(): ApiResponse<Product[]> {
    return await HttpService.get("/products")
  }

  static async one(id: number): ApiResponse<Product> {
    return await HttpService.get(`/products/${id}`)
  }
}

export default ProductsApi