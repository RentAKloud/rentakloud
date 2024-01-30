import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Stripe from "stripe";
import { UsersService } from "./users.service";
import { OnEvent } from "@nestjs/event-emitter";
import { UserToProducts } from "@prisma/client";
import { InstanceAddon } from "src/types/instances.dto";


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

  async createSubscription(email: string, priceId: string, isTrial?: boolean) {
    const customer = await this.findOrCreateCustomer(email);

    const ephemeralKey = await this.stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2020-08-27' },
    );

    const data: Stripe.SubscriptionCreateParams = {
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
    }

    if (isTrial) {
      data.trial_period_days = 7
    }

    const subscription = await this.stripe.subscriptions.create(data);

    return {
      customer,
      ephemeralKey,
      subscriptionId: subscription.id,
      //@ts-ignore
      clientSecret: isTrial ? undefined : subscription.latest_invoice.payment_intent.client_secret,
    };
  }


  @OnEvent("instance.addons.updated")
  async updateSubscription(id: string, addons: InstanceAddon[]) {
    const addonConfig = {
      ram: {
        prices: [
          { id: "price_1ObmU5HxlteLB3wOv5VkUEkr", interval: "month" },
          { id: "price_1ObmU5HxlteLB3wOIP58m2Ul", interval: "year" }
        ]
      }
    }

    try {
      const s = await this.stripe.subscriptions.retrieve(id)
      const interval = s.items.data[0].price.recurring.interval

      const items = addons.filter(a => a.id in addonConfig).map(a => {
        const i: any = {}
        const alreadyAdded = s.items.data.find(si => !!addonConfig[a.id].prices.find(p => p.id === si.price.id))

        // if price_id exists, use si_id to update quantity
        if (alreadyAdded) {
          i.id = alreadyAdded.id
        } else {
          i.price = addonConfig[a.id].prices.find(p => p.interval === interval).id
        }

        // set deleted to true to remove
        if (a.quantity === 0) {
          i.deleted = true
        } else {
          i.quantity = a.quantity
        }

        // skip if no change in quantity
        if (alreadyAdded && i.quantity === alreadyAdded.quantity) {
          return undefined
        }

        return i
      }).filter(i => !!i)

      if (items.length > 0) {
        this.stripe.subscriptions.update(id, {
          items
        })
      }
    } catch (err) {
      console.error(err)
    }
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
        data: {
          profile: {
            update: {
              stripeCustomerId: customer.id
            }
          }
        }
      })
    }

    return customer;
  }

  async fetchPrices(productId?: string) {
    const filter = productId ? { product: productId } : {};

    return (await this.stripe.prices.list(filter)).data;
  }

  async invoices(customerId: string) {
    return this.stripe.invoices.list({
      customer: customerId
    })
  }
}
