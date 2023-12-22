import { ApiResponse, HttpService } from "~/services/HttpService";
import { OrderRequest, OrderResponse as CreateOrderResponse, Order, OrderStatus, CouponCode, Address, Tax, ShippingMethod } from "~/types/order";

class OrdersApi {
  static async all(): ApiResponse<Order[]> {
    return await HttpService.get("/orders")
  }

  static async one(id: number): ApiResponse<Order> {
    return await HttpService.get(`/orders/${id}`)
  }

  static async create(order: OrderRequest): ApiResponse<CreateOrderResponse> {
    return await HttpService.post("/orders", order)
  }

  static async updateStatus(id: number, status: OrderStatus) {
    return await HttpService.post(`/orders/${id}`, { status })
  }

  static async validateCoupon(code: string): ApiResponse<CouponCode> {
    return await HttpService.post<CouponCode>(`/coupons/validate`, { code })
  }

  static async estimateTaxes(address: Partial<Address>, amount: number): ApiResponse<Tax[]> {
    return await HttpService.post('/orders/estimate-taxes', { address, amount })
  }

  static async getShippingMethods(address: Partial<Address>, productIds: number[]): ApiResponse<ShippingMethod[]> {
    return await HttpService.post('/orders/available-shipping-methods', { address, productIds })
  }

  static async getAvailableCoupons(items: any): ApiResponse<CouponCode[]> {
    return HttpService.post('/orders/available-coupons', { items })
  }
}

export default OrdersApi