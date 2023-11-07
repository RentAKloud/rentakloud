import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Order, User } from '@prisma/client';
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

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Order Received',
      template: './order_received',
      context: {
        name: user.firstName + " " + user.lastName,
        order,
        createdAt: order.createdAt.toDateString().replace(/^\S+\s/,'') // replace first non-space chars along with white-space
      },
    });
  }
}
