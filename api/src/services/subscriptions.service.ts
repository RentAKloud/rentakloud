import { Injectable } from '@nestjs/common';
import { Prisma, Subscription } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async subscription(
    subscriptionWhereUniqueInput: Prisma.SubscriptionWhereUniqueInput,
  ): Promise<Subscription | null> {
    return this.prisma.subscription.findUnique({
      where: subscriptionWhereUniqueInput,
      include: {},
    });
  }

  async subscriptions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SubscriptionWhereUniqueInput;
    where?: Prisma.SubscriptionWhereInput;
    orderBy?: Prisma.SubscriptionOrderByWithRelationInput;
  }): Promise<Subscription[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.subscription.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        product: true,
      },
    });
  }

  async createSubscription(
    data: Prisma.SubscriptionCreateInput,
  ): Promise<Subscription> {
    const subscription = await this.prisma.subscription.create({
      data,
    });

    return subscription;
  }

  async updateSubscription(params: {
    where: Prisma.SubscriptionWhereUniqueInput;
    data: Prisma.SubscriptionUpdateInput;
  }): Promise<Subscription> {
    const { where, data } = params;
    data.updatedAt = new Date();

    const subscription = await this.prisma.subscription.update({
      data,
      where,
    });

    return subscription;
  }

  async deleteSubscription(
    where: Prisma.SubscriptionWhereUniqueInput,
  ): Promise<Subscription> {
    return this.prisma.subscription.delete({
      where,
    });
  }
}
