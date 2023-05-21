import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ProductType } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ParseOrderPipe, ParsedCreateOrderReq } from 'src/pipes/parse-order';
import { OrdersService } from 'src/services/orders.service';
import { ProductsService } from 'src/services/products.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private productsService: ProductsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  orders(@Request() req) {
    return this.ordersService.orders({ where: { userId: req.user.userId } })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  order(@Param('id') id: number) {
    return this.ordersService.order({ id })
  }

  // This is for physical products only. We don't create orders for products of type OnlineService (subscription based)
  // For subscription based/OnlineService products, see products.controller
  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(
    @Request() req,
    @Body(ParseOrderPipe) data: ParsedCreateOrderReq
  ) {
    const { items } = data

    // TODO we should also just select the specific price
    const products = await this.productsService.productsWithSelect({
      where: {
        id: {
          in: items.map(i => i.productId)
        }
      },
      select: {
        id: true, name: true, prices: true, productType: true
      }
    })

    data.user = { connect: { id: req.user.userId } }
    data.items = items
      .filter((_, i) => products[i].productType === ProductType.Physical)
      .map((item, i) => ({
        quantity: item.quantity,
        product: products[i] as any // idk
      }))

    const order = await this.ordersService.createOrder(data)

    // Calculate order total amount. This amount is used for confirmCardPayment at frontend.
    // excludes amount for subscriptions
    // @ts-ignore
    order.amount = order.items.reduce((sum: number, curr: { product: any, quantity: number }) => {
      if (curr.product.productType === ProductType.OnlineService) {
        return sum
      }
      return sum + curr.product.prices[0].amount * curr.quantity
    }, 0)

    return order
  }

  // TODO add validation using filter to make sure the user owns the order
  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Request() req
  ) {
    const { status } = req.body
    this.ordersService.updateOrder({
      where: { id },
      data: { status }
    })
  }
}
