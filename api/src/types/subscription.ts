export class CreateSubscriptionReq {
  email: string;
  productId: number;
  planId: number;
  priceId: string;
  isTrial?: boolean;
  paymentMethodId?: string;
}
