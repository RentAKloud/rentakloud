import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Order, OrderStatus, User } from '@prisma/client';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { OrderItem } from 'src/types/order';
import { OrdersService } from './orders.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService
  ) { }

  async _sendUserConfirmation(user: User, token: string) {
    const dev = this.config.get('NODE_ENV') === 'development'
    const url = `${dev ? 'http://localhost:3001' : 'https://rentakloud.com'}/confirm-email?token=${token}`;

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

  @OnEvent('user.created')
  userCreated(user: User, token: string) {
    this._sendUserConfirmation(user, token)
  }

  @OnEvent('user.resend-confirmation')
  resendConfirmation(user: User, token: string) {
    this._sendUserConfirmation(user, token)
  }

  @OnEvent('user.reset-password')
  async sendResetPasswordMail(user: User, token: string) {
    const dev = this.config.get('NODE_ENV') === 'development'
    const url = `${dev ? 'http://localhost:3001' : 'https://rentakloud.com'}/forgot-password?token=${token}`

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Reset Your RentAKloud Password",
      template: './user_reset_password',
      context: {
        name: user.firstName + " " + user.lastName,
        resetUrl: url
      }
    })
  }

  generateOrderInfo(order: Order) {
    const items = order.items as OrderItem[]
    let currency = items[0].product.prices[0].currency || items[0].product.prices[0].prices[0].currency

    return {
      subTotal: this.ordersService.calculateSubtotal(items),
      taxesTotal: (order.taxes as any[]).reduce((curr, next) => curr + +next.amount, 0).toFixed(2),
      currency
    }
  }

  @OnEvent('order.created')
  async sendOrderReceivedNotification(order: Order) {
    const user = await this.usersService.user({ id: order.userId })
    const {
      subTotal,
      taxesTotal,
      currency
    } = this.generateOrderInfo(order)

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

    const dev = this.config.get('NODE_ENV') === 'development'
    const adminUrl = dev ? 'http://localhost:5137' : 'https://admin.rentakloud.com';
    await this.mailerService.sendMail({
      to: 'orders@rentakloud.com',
      subject: 'Order Received',
      template: './admin_order_received',
      context: {
        customerId: user.id,
        customerEmail: user.email,
        customerName: user.firstName + " " + user.lastName,
        order,
        subTotal,
        taxesTotal,
        currency,
        createdAt: order.createdAt.toDateString().replace(/^\S+\s/, ''), // replace first non-space chars along with white-space
        adminUrl
      },
    })
  }

  @OnEvent('order.status.changed')
  async orderStatusChanged(order: Order) {
    const statuses: OrderStatus[] = [OrderStatus.Completed, OrderStatus.Cancelled, OrderStatus.Shipped]
    if (!statuses.includes(order.status)) {
      return
    }

    const user = await this.usersService.user({ id: order.userId })
    const {
      subTotal,
      taxesTotal,
      currency
    } = this.generateOrderInfo(order)
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

  async contactForm(email: string, name: string, subject: string, message: string) {
    await this.mailerService.sendMail({
      to: "info@rentakloud.com",
      subject,
      html: `
        <h3>From: ${email}</h3>
        <p>${message}</p>
      `
    });
  }
}
