import { HttpService } from "../services/HttpService";
import { OrderRequest } from "../types/order";

class OrdersApi {
  static async all() {
    await HttpService.get("/orders")
  }

  static async one(id: number) {
    await HttpService.get(`/orders/${id}`)
  }

  static async create(order: OrderRequest) {
    await HttpService.post("/orders", order)
  }
}

export default OrdersApi