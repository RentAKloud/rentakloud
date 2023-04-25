import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from 'src/services/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly configService: ConfigService,
  ) { }

  @Post()
  create(
    @Body()
    createPaymentDto,
  ) {
    return this.paymentsService.create();
  }

  @Post('new-subscription')
  async createSubscription(@Req() request: Request) {
    const { email, priceId } = request.body;

    const { clientSecret, ephemeralKey, customer, subscriptionId } =
      await this.paymentsService.createSubscription(email, priceId);

    return {
      clientSecret,
      subscriptionId,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: this.configService.get('STRIPE_PK_TEST'),
    };
  }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body) {
    const { email, priceId, amount } = body;

    const { clientSecret, ephemeralKey, customer } =
      await this.paymentsService.createPaymentIntent(email, amount);

    return {
      clientSecret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    };
  }

  @Post('stripe-webhook')
  async webhooks(@Req() request: Request) {
    const event = request.body;

    switch (event.type) {
      case 'product.created': {
        const product = event.data.object;
        // const plan = new Product();
        // plan.title = product.name;
        // plan.description = product.description;
        // plan.visible = product.active;
        // plan.product_id = product.id;
        // plan.features = [''];
        break;
      }
      case 'product.updated': {
        const product = event.data.object;
        // const plan = await this.repositoryService.repository(Plan).findOneBy({
        //   product_id: product.id,
        // });

        // if (plan) {
        //   plan.title = product.name;
        //   plan.description = product.description;
        //   plan.visible = product.active;

        //   this.repositoryService.repository(Plan).update(plan.id, plan);
        // }
        break;
      }
      case 'product.deleted':
        break;
    }

    return true;
  }
}
