import { ApiResponse, HttpService } from "~/services/HttpService";
import { Payment } from "~/types/payment";

export type CreatePaymentIntent = {
  clientSecret: string;
  ephemeralKey: string;
  customer: string;
};

type PaymentMethod = {
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
  ): ApiResponse<CreatePaymentIntent> {
    return await HttpService.post("/payments/create-payment-intent", {
      email: userEmail,
      amount: orderAmount,
    });
  }

  static async paymentMethods(): ApiResponse<PaymentMethod[]> {
    return await HttpService.get("/payments/methods");
  }
}

export default PaymentsApi;
