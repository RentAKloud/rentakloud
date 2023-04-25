import { HttpService } from "../services/HttpService";
import { Product } from "../types/product";

class ProductsApi {
  static async all(): Promise<Product[]> {
    return await HttpService.get("/products")
  }

  static async one(id: number): Promise<Product> {
    return await HttpService.get(`/products/${id}`)
  }
}

export default ProductsApi