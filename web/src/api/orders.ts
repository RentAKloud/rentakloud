import { HttpService } from "../services/HttpService";
import { OrderRequest, OrderResponse } from "../types/order";

class OrdersApi {
  static async all(): Promise<any[]> {
    return await HttpService.get("/orders")
  }

  static async one(id: number) {
    return await HttpService.get(`/orders/${id}`)
  }

  static async create(order: OrderRequest): Promise<OrderResponse> {
    return await HttpService.post("/orders", order)
  }
}

export default OrdersApi