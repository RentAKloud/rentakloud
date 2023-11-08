import { Controller, Get, HttpException, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './services/mail.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { UsersService } from './services/users.service';
import { OrdersService } from './services/orders.service';
import { readFile } from 'fs/promises';
import { cwd } from 'process';
import * as hbs from 'handlebars';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService
  ) { }

  /**
   * Hello world route for testing purposes.
   */
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('/mail')
  async testMail(
    @Query() q,
  ) {
    if (this.config.get('NODE_ENV') !== 'development') {
      return new HttpException('Not allowed', HttpStatus.FORBIDDEN)
    }

    let user: User
    if (q.userId) {
      user = await this.usersService.user({ id: +q.userId })
    }

    hbs.registerPartial("_head", await this.loadTemplate('partials/_head'))
    hbs.registerPartial("_footer", await this.loadTemplate('partials/_footer'))
    hbs.registerPartial("_end", await this.loadTemplate('partials/_end'))

    switch (q.name) {
      case 'user_confirmation':
        if ('renderOnly' in q) {
          hbs.registerPartial("_header", await this.loadTemplate('partials/_header', { title: "Welcome to RentAKloud!" }))
          return this.loadTemplate("user_confirmation")
        } else {
          this.mailService.sendUserConfirmation(user, 'xddinside')
          return
        }
      case 'order_received':
        if (!q.orderId) {
          return "orderId is required"
        }
        const order = await this.ordersService.order({ id: +q.orderId })
        const createdAt = order.createdAt.toDateString().replace(/^\S+\s/, '') // replace first non-space chars along with white-space
        const u = await this.usersService.user({ id: order.userId })

        if ('renderOnly' in q) {
          hbs.registerPartial("_header", await this.loadTemplate('partials/_header', { title: "Thank you for your order" }))
          hbs.registerPartial("_order_details", await this.loadTemplate('partials/_order_details', { order }))
          return this.loadTemplate("order_received", { order, name: u.firstName, createdAt })
        } else {
          this.mailService.sendOrderReceivedNotification(order)
          return "Sent order confirmation"
        }
      default:
        return `param 'name' is required. Valid values:<br/>
        - user_confirmation <br/>
        - order_received <br/>
        <br/>
        Optional params:<br/>
        - userId: number<br/>
        - orderId: number<br/>
        - renderOnly (to not actually send an email, just see preview)`
    }
  }

  async loadTemplate(name: string, data?: any) {
    const input = await readFile(cwd() + '/src/templates/' + name + '.hbs')
    const template = hbs.compile(input.toString())
    return template(data || {})
  }
}
