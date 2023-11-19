import { Injectable } from "@nestjs/common";
import { Notification, NotificationStatus, Order, OrderStatus, Prisma, User } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async notification(
    notificationWhereUniqueInput: Prisma.NotificationWhereUniqueInput,
  ): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: notificationWhereUniqueInput,
    });
  }

  async notifications(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NotificationWhereUniqueInput;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput;
  }): Promise<Notification[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.notification.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createNotification(data: Prisma.NotificationCreateInput): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data,
    });

    return notification
  }

  async updateNotification(params: {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.NotificationUpdateInput;
  }): Promise<Notification> {
    const { where, data } = params;
    return this.prisma.notification.update({
      data,
      where,
    });
  }

  async deleteNotification(where: Prisma.NotificationWhereUniqueInput): Promise<Notification> {
    return this.prisma.notification.delete({
      where,
    });
  }

  @OnEvent('user.created')
  async welcomeMessage(user: User) {
    this.createNotification({
      user: { connect: { id: user.id } },
      title: "Welcome to RentAKloud",
      body: `Hello ${user.firstName} and welcome.`,
      status: NotificationStatus.Created
    })
  }

  @OnEvent('order.created')
  async orderCreated(order: Order) {
    this.createNotification({
      user: { connect: { id: order.userId } },
      title: `Order #${order.id} was placed successfully`,
      body: `Your order was placed. You can see its details on the billing page. We will notify you once its status changes.`,
      status: NotificationStatus.Created
    })
  }

  @OnEvent('order.status.changed')
  async orderStatusChanged(order: Order) {
    const statuses: OrderStatus[] = [OrderStatus.Completed, OrderStatus.Cancelled, OrderStatus.Shipped]
    if (!statuses.includes(order.status)) {
      return
    }

    const notifications = {
      [OrderStatus.Completed]: {
        title: `Order #${order.id} has been completed.`,
        body: "Your order has been delivered and completed successfully."
      },
    }
  
    this.createNotification({
      user: { connect: { id: order.userId } },
      title: notifications[order.status].title,
      body: notifications[order.status].body,
      status: NotificationStatus.Created
    })
  }
}