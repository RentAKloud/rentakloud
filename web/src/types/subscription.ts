import { Product } from "./product";
import { getPlanPrice, getProductPrice } from "~/stores/products";

export class Subscription {
  id: string;
  productId: number;
  product: Product;
  planId: number;
  priceId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;

  constructor(subscription: Subscription) {
    this.id = subscription.id;
    this.productId = subscription.productId;
    this.product = subscription.product;
    this.planId = subscription.planId;
    this.priceId = subscription.priceId;
    this.currentPeriodStart = subscription.currentPeriodStart;
    this.currentPeriodEnd = subscription.currentPeriodEnd;
  }

  title() {
    const plan = this.plan();
    const planPrice = this.planPrice();
    const interval = planPrice
      ? ` - ${plan.planName} ${planPrice!.interval}ly`
      : "";
    return this.product.name + " " + interval;
  }

  plan() {
    return getProductPrice(this.product, this.planId);
  }
  planPrice() {
    const plan = this.plan();
    return getPlanPrice(plan, this.priceId);
  }

  getCurrentPeriodStart() {
    return new Date(this.currentPeriodStart);
  }

  getCurrentPeriodEnd() {
    return new Date(this.currentPeriodEnd);
  }
}
