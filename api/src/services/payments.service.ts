import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { UsersService } from "./users.service";
import { OnEvent } from "@nestjs/event-emitter";
import { UserToProducts } from "@prisma/client";


@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    const stripeKey = this.configService.get('STRIPE_SECRET_KEY');
    if (!this.stripe) {
      this.stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });
    }
  }

  async createSubscription(email: string, priceId: string) {
    const customer = await this.findOrCreateCustomer(email);

    const ephemeralKey = await this.stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2020-08-27' },
    );

    const subscription = await this.stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: priceId,
        },
      ],
      // coupon: couponId,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: { email },
    });

    return {
      customer,
      ephemeralKey,
      subscriptionId: subscription.id,
      //@ts-ignore
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    };
  }

  @OnEvent("user_product.deleted")
  async cancelSubscription(userProduct: UserToProducts) {
    // TODO refund logic?
    try {
      return await this.stripe.subscriptions.cancel(userProduct.subscriptionId)
    } catch (err) {
      console.log(err.message)
      // TODO Send a notification? about an ActiveProduct getting deleted but failed
      // to cancel its subscription
    }
  }

  async createPaymentIntent(email: string, amount: number) {
    const customer = await this.findOrCreateCustomer(email);
    const ephemeralKey = await this.stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2020-08-27' },
    );

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      customer,
      ephemeralKey,
      clientSecret: paymentIntent.client_secret,
    };
  }

  async findOrCreateCustomer(
    email: string,
  ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    const user = await this.userService.userWithProfile({ email });

    let customer: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>;
    if (user.profile.stripeCustomerId) {
      customer = await this.stripe.customers.retrieve(user.profile.stripeCustomerId);
    }

    if (!customer) {
      customer = await this.stripe.customers.create({
        email,
      });
      this.userService.updateUser({
        where: { id: user.id },
        data: { profile: {} }
      })
    }

    return customer;
  }

  async fetchPrices(productId?: string) {
    const filter = productId ? { product: productId } : {};

    return (await this.stripe.prices.list(filter)).data;
  }
}
