import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PaymentsService } from 'src/services/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  payments() {
    return []
  }

  @Post('create-subscription')
  async createSubscription(@Request() request) {
    const { email, priceId } = request.body;

    const { clientSecret, ephemeralKey, customer, subscriptionId } =
      await this.paymentsService.createSubscription(email, priceId);

    return {
      clientSecret,
      subscriptionId,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      // publishableKey: this.configService.get('STRIPE_PK_TEST'),
    };
  }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body) {
    const { email, amount } = body;

    const { clientSecret, ephemeralKey, customer } =
      await this.paymentsService.createPaymentIntent(email, amount);

    return {
      clientSecret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    };
  }

  @Post('stripe-webhook')
  async webhooks(@Request() request) {
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
