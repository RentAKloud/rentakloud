import { HttpService } from "../services/HttpService";

class ProductsApi {
  static async all() {
    await HttpService.get("/products")
  }

  static async one(id: number) {
    await HttpService.get(`/products/${id}`)
  }
}

export default ProductsApi