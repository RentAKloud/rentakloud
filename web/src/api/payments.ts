import { HttpService } from "../services/HttpService";
import { Payment } from "../types/payment";

type CreatePaymentIntent = {
  clientSecret: string,
  ephemeralKey: string,
  customer: string
}

export type CreateSubscriptionResponse = CreatePaymentIntent & { subscriptionId: string }

class PaymentsApi {
  static async all(): Promise<Payment[]> {
    return await HttpService.get("/payments")
  }

  static async one(id: number): Promise<Payment> {
    return await HttpService.get(`/payment/${id}`)
  }

  static async createPaymentIntent(userEmail: string, orderAmount: number): Promise<CreatePaymentIntent> {
    return await HttpService.post('/payments/create-payment-intent', {
      email: userEmail,
      amount: orderAmount
    })
  }

  static async createSubscription(userEmail: string, priceId: string): Promise<CreateSubscriptionResponse> {
    return await HttpService.post('/payments/create-subscription', {
      email: userEmail,
      priceId
    })
  }
}

export default PaymentsApi