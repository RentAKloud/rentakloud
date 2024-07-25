import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PaymentsService } from 'src/services/payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async payments(@Request() req) {
    const customer = await this.paymentsService.findOrCreateCustomer(
      req.user.email,
    );
    return (await this.paymentsService.invoices(customer.id)).data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/methods')
  async paymentMethods(@Request() req) {
    const customer = await this.paymentsService.findOrCreateCustomer(
      req.user.email,
    );
    return await this.paymentsService.paymentMethods(customer.id);
  }

  // NOTE Not called directly anymore. See subscriptions.controller
  @Post('create-subscription')
  async createSubscription(@Request() request) {
    // TODO check if user has already used a trial
    const { email, priceId, isTrial } = request.body;

    const { clientSecret, ephemeralKey, customer, subscriptionId } =
      await this.paymentsService.createSubscription(email, priceId, isTrial);

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

  @UseGuards(JwtAuthGuard)
  @Delete('/methods/:id')
  async deletePaymentMethod(@Param('id') id: string) {
    return await this.paymentsService.deletePaymentMethod(id);
  }

  @Post('webhook')
  async webhooks(@Request() request) {
    const event = request.body;

    // const sig = request.headers['stripe-signature'];

    // try {
    //   let _event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    // }
    // catch (err) {
    //   return `Webhook Error: ${err.message}`
    // }

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
      case 'invoice.created':
        break;
      case 'customer.subscription.trial_will_end':
        break;
    }

    return true;
  }
}
