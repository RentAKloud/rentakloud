import { HttpService } from "../services/HttpService";
import { Payment } from "../types/payment";

class PaymentsApi {
  static async all(): Promise<Payment[]> {
    return await HttpService.get("/payments")
  }

  static async one(id: number): Promise<Payment> {
    return await HttpService.get(`/payment/${id}`)
  }
}

export default PaymentsApi