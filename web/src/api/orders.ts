import { HttpService } from "../services/HttpService";
import { OrderRequest, OrderResponse as CreateOrderResponse, Order } from "../types/order";

class OrdersApi {
  static async all(): Promise<Order[]> {
    return await HttpService.get("/orders")
  }

  static async one(id: number): Promise<Order> {
    return await HttpService.get(`/orders/${id}`)
  }

  static async create(order: OrderRequest): Promise<CreateOrderResponse> {
    return await HttpService.post("/orders", order)
  }
}

export default OrdersApi