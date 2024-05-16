import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Subscription, Prisma, UserType, SubscriptionStatus } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SubscriptionsService } from '../services/subscriptions.service';
import { UsersService } from '../services/users.service';
import { PaymentsService } from 'src/services/payments.service';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly usersService: UsersService,
    private readonly paymentsService: PaymentsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async subscriptions(@Request() req) {
    const user = await this.usersService.user({ id: req.user.userId })

    const where: Prisma.SubscriptionWhereInput = {}
    if (user.type !== UserType.Admin) {
      where.userId = user.id
    }

    return this.subscriptionsService.subscriptions({
      where,
      orderBy: { createdAt: 'desc' }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async subscription(@Request() req, @Param('id') id: string) {
    const user = await this.usersService.user({ id: req.user.userId })

    const where: Prisma.SubscriptionWhereUniqueInput = { id }
    if (user.type !== UserType.Admin) {
      where.userId = user.id
    }

    return this.subscriptionsService.subscription(where)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSubscription(
    @Request() req,
    @Body() data: { email: string, productId: number, priceId: string, isTrial?: boolean }
  ) {
    const {
      clientSecret, ephemeralKey, customer, subscriptionId
    } = await this.paymentsService.createSubscription(data.email, data.priceId, data.isTrial)

    const subscription = await this.subscriptionsService.createSubscription({
      user: {
        connect: { id: req.user.userId }
      },
      product: {
        connect: { id: data.productId }
      },
      planId: 1,
      priceId: data.priceId,
      externalId: subscriptionId,
      status: SubscriptionStatus.Incomplete,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(+new Date() + (12*30*24*60*60*1000)),
    })

    return {
      subscriptionId: subscription.id,
      clientSecret,
      externalId: subscriptionId,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      // publishableKey: this.configService.get('STRIPE_PK_TEST'),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateSubscription(@Body() subscription: Subscription) {
    return this.subscriptionsService.updateSubscription({
      where: { id: subscription.id },
      data: subscription
    })
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  updateSubscriptionStatus(
    @Param('id', ParseIntPipe) id: string,
    @Request() req
  ) {
    const { status } = req.body
    this.subscriptionsService.updateSubscription({
      where: { id },
      data: { status }
    })
  }
}
