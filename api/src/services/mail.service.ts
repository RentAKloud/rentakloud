import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Order, OrderStatus, User } from '@prisma/client';
import { UsersService } from './users.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly usersService: UsersService,
  ) { }

  @OnEvent('user.created')
  async sendUserConfirmation(user: User, token: string) {
    const url = `rentakloud.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to RentAKloud! Confirm your Email',
      template: './user_confirmation', // `.hbs` extension is appended automatically
      context: {
        name: user.firstName + " " + user.lastName,
        url,
      },
    });
  }

  @OnEvent('order.created')
  async sendOrderReceivedNotification(order: Order) {
    const user = await this.usersService.user({ id: order.userId })
    const subTotal = order.items.reduce((curr, next: any) => curr + next.product.prices[0].saleAmount || next.product.prices[0].amount, 0)
    const taxesTotal = (order.taxes as any[]).reduce((curr, next) => curr + next.amount, 0)
    const currency = (order.items[0] as any).product.prices[0].currency

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Order Received',
      template: './order_received',
      context: {
        name: user.firstName + " " + user.lastName,
        order,
        subTotal,
        taxesTotal,
        currency,
        createdAt: order.createdAt.toDateString().replace(/^\S+\s/, '') // replace first non-space chars along with white-space
      },
    });
  }

  @OnEvent('order.status.changed')
  async orderStatusChanged(order: Order) {
    const statuses: OrderStatus[] = [OrderStatus.Completed, OrderStatus.Cancelled, OrderStatus.Shipped]
    if (!statuses.includes(order.status)) {
      return
    }

    const user = await this.usersService.user({ id: order.userId })
    const subTotal = order.items.reduce((curr, next: any) => curr + next.product.prices[0].saleAmount || next.product.prices[0].amount, 0)
    const taxesTotal = (order.taxes as any[]).reduce((curr, next) => curr + next.amount, 0)
    const currency = (order.items[0] as any).product.prices[0].currency
    const commonContext = {
      name: user.firstName + " " + user.lastName,
      order,
      subTotal,
      taxesTotal,
      currency,
      createdAt: order.createdAt.toDateString().replace(/^\S+\s/, '')
    }

    const contents = {
      [OrderStatus.Completed]: {
        template: './order_completed',
        subject: `Order #${order.id} has been completed.`,
        body: "Your order has been delivered and completed successfully.",
        context: commonContext
      },
      [OrderStatus.Cancelled]: {
        template: './order_cancelled',
        subject: `Order #${order.id} has been cancelled.`,
        body: "Unfortunately, your order was cancelled.",
        context: commonContext
      },
      [OrderStatus.Shipped]: {
        template: './order_shipped',
        subject: `Order #${order.id} has been shipped.`,
        body: "Your order is on its way.",
        context: commonContext
      },
    }

    await this.mailerService.sendMail({
      ...contents[order.status],
      to: user.email,
    });
  }
}
