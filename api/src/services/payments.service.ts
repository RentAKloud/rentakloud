import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UsersService } from './users.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Instance, Subscription } from '@prisma/client';
import { InstanceAddon, Plan } from 'src/types/instances.dto';
import { OptionsService } from './options.service';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    this.loadStripe();
  }

  @OnEvent('app-settings.changed')
  loadStripe() {
    const stripeKey = this.configService.get(
      OptionsService.appSettings?.isStripeTestMode
        ? 'STRIPE_SECRET_KEY_TEST'
        : 'STRIPE_SECRET_KEY_LIVE',
    );
    this.stripe = new Stripe(stripeKey, { apiVersion: '2024-04-10' });
  }

  async createSubscription(
    email: string,
    priceId: string,
    isTrial?: boolean,
    default_payment_method?: string,
  ) {
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
    };

    if (default_payment_method) {
      data.default_payment_method = default_payment_method;
    }

    if (isTrial) {
      data.trial_period_days = 7;
    }

    const subscription = await this.stripe.subscriptions.create(data);

    return {
      customer,
      ephemeralKey,
      subscriptionId: subscription.id,
      clientSecret: isTrial
        ? undefined
        : //@ts-ignore
          subscription.latest_invoice.payment_intent.client_secret,
      currentPeriodEnd: subscription.current_period_end,
    };
  }

  @OnEvent('instance.addons.updated')
  async updateSubscription(id: string, addons: InstanceAddon[], plans: Plan[]) {
    try {
      const sub = await this.stripe.subscriptions.retrieve(id);
      const _selectedPlan = sub.items.data[0].price;
      const selectedPlan = plans.find((p) =>
        p.prices.find((pr) => pr.priceId === _selectedPlan.id),
      );
      const addonsConfig = selectedPlan.addons;
      const interval = _selectedPlan.recurring.interval;

      const items = addons
        .filter((a) => addonsConfig.map((c) => c.id).includes(a.id))
        .map((addon) => {
          const item: any = {};
          const addonConfig = addonsConfig.find((a) => a.id === addon.id);
          const alreadyAdded = sub.items.data.find(
            (si) => !!addonConfig.prices.find((p) => p.priceId === si.price.id),
          );

          // skip if no change in quantity
          // or if it doesnt exist and quantity is 0
          if (
            (alreadyAdded && addon.quantity === alreadyAdded.quantity) ||
            (!alreadyAdded && addon.quantity === 0)
          ) {
            return undefined;
          }

          // if price_id exists, use si_id to update quantity
          if (alreadyAdded) {
            item.id = alreadyAdded.id;
          } else {
            item.price = addonConfig.prices.find(
              (p) => p.interval === interval,
            ).priceId;
          }

          // set deleted to true to remove
          if (addon.quantity === 0) {
            item.deleted = true;
          } else {
            item.quantity = addon.quantity;
          }

          return item;
        })
        .filter((i) => !!i);

      if (items.length > 0) {
        await this.stripe.subscriptions.update(id, {
          items,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  @OnEvent('instance.deleted')
  async cancelSubscription(
    instance: Instance & { subscription: Subscription },
  ) {
    // TODO refund logic?
    try {
      return await this.stripe.subscriptions.cancel(
        instance.subscription.externalId,
      );
    } catch (err) {
      console.log(err.message);
      // TODO Send a notification? about an ActiveProduct getting deleted but failed
      // to cancel its subscription
    }
  }

  async createPaymentIntent(
    email: string,
    amount: number,
    payment_method?: string,
  ) {
    const customer = await this.findOrCreateCustomer(email);
    const ephemeralKey = await this.stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2020-08-27' },
    );

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method,
      return_url:
        this.configService.get('FRONT_URL') + '/checkout?step=payment',
      confirm: true,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      customer,
      ephemeralKey,
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
    };
  }

  async findOrCreateCustomer(
    email: string,
  ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    const user = await this.userService.userWithProfile({ email });

    let customer: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>;
    if (user.profile.stripeCustomerId) {
      customer = await this.stripe.customers.retrieve(
        user.profile.stripeCustomerId,
      );
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
              stripeCustomerId: customer.id,
            },
          },
        },
      });
    }

    return customer;
  }

  async fetchPrices(productId?: string) {
    const filter = productId ? { product: productId } : {};

    return (await this.stripe.prices.list(filter)).data;
  }

  async invoices(customerId: string) {
    return this.stripe.invoices.list({
      customer: customerId,
    });
  }

  async paymentMethods(customerId: string) {
    return this.stripe.paymentMethods.list({
      customer: customerId,
    });
  }

  async deletePaymentMethod(paymentMethodId: string) {
    return this.stripe.paymentMethods.detach(paymentMethodId);
  }
}
