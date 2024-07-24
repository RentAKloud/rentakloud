import { ApiResponse, HttpService } from "~/services/HttpService";
import { Subscription } from "~/types/subscription";
import { CreatePaymentIntent } from "./payments";

export type CreateSubscriptionResponse = CreatePaymentIntent & {
  subscriptionId: string;
};

class SubscriptionsApi {
  static async all(): ApiResponse<Subscription[]> {
    return await HttpService.get("/subscriptions");
  }

  static async one(id: number): ApiResponse<Subscription> {
    return await HttpService.get(`/subscriptions/${id}`);
  }

  static async createSubscription(
    userEmail: string,
    productId: number,
    planId: number,
    priceId: string,
    isTrial: boolean,
  ): ApiResponse<CreateSubscriptionResponse> {
    return await HttpService.post("/subscriptions", {
      email: userEmail,
      productId,
      planId,
      priceId,
      isTrial,
    });
  }
}

export default SubscriptionsApi;
