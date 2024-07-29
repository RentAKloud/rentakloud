import { ApiResponse, HttpService } from "~/services/HttpService";
import { Paginated } from "~/types/common";
import { Payment } from "~/types/payment";

export type CreatePaymentIntent = {
  clientSecret: string;
  ephemeralKey: string;
  customer: string;
  status: "succeeded" | "requires_action";
};

type PaymentMethod = {
  id: string;
  card: {
    brand: string;
    exp_month: number;
    exp_year: number;
    last4: string;
  };
};

class PaymentsApi {
  static async all(): ApiResponse<Payment[]> {
    return await HttpService.get("/payments");
  }

  static async one(id: number): ApiResponse<Payment> {
    return await HttpService.get(`/payment/${id}`);
  }

  static async createPaymentIntent(
    userEmail: string,
    orderAmount: number,
    paymentMethodId?: string | null,
  ): ApiResponse<CreatePaymentIntent> {
    return await HttpService.post("/payments/create-payment-intent", {
      email: userEmail,
      amount: orderAmount,
      paymentMethodId,
    });
  }

  static async paymentMethods(): ApiResponse<Paginated<PaymentMethod>> {
    return await HttpService.get("/payments/methods");
  }

  static async deletePaymentMethod(id: string): ApiResponse<PaymentMethod> {
    return await HttpService.delete(`/payments/methods/${id}`);
  }
}

export default PaymentsApi;
