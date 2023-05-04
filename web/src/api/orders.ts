import { HttpService } from "../services/HttpService";
import { OrderRequest, OrderResponse as CreateOrderResponse, Order, OrderStatus } from "../types/order";

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

  static async updateStatus(id: number, status: OrderStatus) {
    return await HttpService.post(`/orders/${id}`, { status })
  }
}

export default OrdersApi