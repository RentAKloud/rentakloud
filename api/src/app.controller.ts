import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './services/mail.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { readFile } from 'fs/promises';
import { cwd } from 'process';
import * as hbs from 'handlebars';
import * as states from './data/states.json';
import { JwtPayload } from './types/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Hello world route for testing purposes.
   */
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/countries')
  countriesList() {
    return [
      { name: 'United States (USA)', code: 'US' },
      { name: 'United Kingdom (UK)', code: 'GB' },
      { name: 'Canada', code: 'CA' },
      { name: 'Australia', code: 'AU' },
    ];
  }

  @Get('/states')
  statesList(@Query('country') country: string) {
    return country ? states[country] : states['US'];
  }

  // TODO see https://nodemailer.com/transports/stream/ and implement for proper testing
  @Get('/mail')
  async testMail(@Query() q) {
    if (this.config.get('NODE_ENV') !== 'development') {
      return new HttpException('Not allowed', HttpStatus.FORBIDDEN);
    }

    let user: User;
    if (q.userId) {
      user = await this.usersService.user({ id: +q.userId });
    }

    hbs.registerPartial('_head', await this.loadTemplate('partials/_head'));
    hbs.registerPartial(
      '_content_start',
      await this.loadTemplate('partials/_content_start'),
    );
    hbs.registerPartial(
      '_content_end',
      await this.loadTemplate('partials/_content_end'),
    );
    hbs.registerPartial('_footer', await this.loadTemplate('partials/_footer'));
    hbs.registerPartial('_end', await this.loadTemplate('partials/_end'));

    switch (q.name) {
      case 'user_confirmation':
        const payload: JwtPayload = { email: user.email, sub: user.id };
        const jwt = this.jwtService.sign(payload);
        if ('renderOnly' in q) {
          hbs.registerPartial(
            '_header',
            await this.loadTemplate('partials/_header', {
              title: 'Welcome to RentAKloud!',
            }),
          );
          const frontUrl = this.config.get('FRONT_URL');
          const url = `${frontUrl}/confirm-email?token=${jwt}`;
          return this.loadTemplate('user_confirmation', {
            //@ts-ignore
            name: user.fullName,
            url,
          });
        } else {
          this.mailService._sendUserConfirmation(user, jwt);
          return 'Success';
        }
      case 'order_received': {
        if (!q.orderId) {
          return 'orderId is required';
        }
        const order = await this.ordersService.order({ id: +q.orderId });
        const subTotal = order.items.reduce<number>(
          (sum, next: { product: any; quantity: number }) => {
            const amount: number =
              next.product.prices[0].saleAmount ||
              next.product.prices[0].amount;
            return sum + amount * next.quantity;
          },
          0,
        );
        const taxesTotal = (order.taxes as any[])
          .reduce((curr, next) => curr + +next.amount, 0)
          .toFixed(2);
        const createdAt = order.createdAt.toDateString().replace(/^\S+\s/, ''); // replace first non-space chars along with white-space
        const currency = (order.items[0] as any).product.prices[0].currency;
        const u = await this.usersService.user({ id: order.userId });

        if ('renderOnly' in q) {
          hbs.registerPartial(
            '_header',
            await this.loadTemplate('partials/_header', {
              title: 'Thank you for your order',
            }),
          );
          hbs.registerPartial(
            '_order_details',
            await this.loadTemplate('partials/_order_details', {
              order,
              subTotal,
              taxesTotal,
              currency,
            }),
          );
          return this.loadTemplate('order_received', {
            order,
            name: u.firstName,
            createdAt,
          });
        } else {
          this.mailService.sendOrderReceivedNotification(order);
          return 'Sent order confirmation';
        }
      }
      case 'order_cancelled':
        if (!q.orderId) {
          return 'orderId is required';
        }
        const order = await this.ordersService.order({ id: +q.orderId });
        const subTotal = order.items.reduce(
          (curr, next: any) =>
            curr + next.product.prices[0].saleAmount ||
            next.product.prices[0].amount,
          0,
        );
        const taxesTotal = (order.taxes as any[]).reduce(
          (curr, next) => curr + next.amount,
          0,
        );
        const createdAt = order.createdAt.toDateString().replace(/^\S+\s/, ''); // replace first non-space chars along with white-space
        const currency = (order.items[0] as any).product.prices[0].currency;
        const u = await this.usersService.user({ id: order.userId });
        if ('renderOnly' in q) {
          hbs.registerPartial(
            '_header',
            await this.loadTemplate('partials/_header', {
              title: 'Your Order Has Been Cancelled!',
            }),
          );
          hbs.registerPartial(
            '_order_details',
            await this.loadTemplate('partials/_order_details', {
              order,
              subTotal,
              taxesTotal,
              currency,
            }),
          );
          //@ts-ignore
          return this.loadTemplate('order_cancelled', {
            name: u.firstName,
            order,
            createdAt,
          });
        } else {
          this.mailService.orderStatusChanged(order);
          return 'Success';
        }
      default:
        return `param 'name' is required. Valid values:<br/>
        - user_confirmation <br/>
        -- userId: number<br/>
        - order_received <br/>
        -- orderId: number<br/>
        - order_cancelled<br/>
        -- orderId: number<br/>
        <br/>
        Optional params:<br/>
        - renderOnly (to not actually send an email, just see preview)`;
    }
  }

  async loadTemplate(name: string, data?: any) {
    const input = await readFile(cwd() + '/src/templates/' + name + '.hbs');
    const template = hbs.compile(input.toString());
    return template(data || {});
  }
}
