import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ParseOrderPipe, ParsedCreateOrderReq } from 'src/pipes/parse-order';
import { OrdersService } from 'src/services/orders.service';
import { ProductsService } from 'src/services/products.service';
import { CreateOrderReq } from 'src/types/order';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private productsService: ProductsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  orders(@Request() req) {
    return this.ordersService.orders({ where: { userId: req.user.id } })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  order(@Param('id') id: number) {
    return this.ordersService.order({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(
    @Request() req,
    @Body(ParseOrderPipe) data: ParsedCreateOrderReq
  ) {
    const { items } = data

    // TODO we can also just select the specific price
    const products = await this.productsService.productsWithSelect({
      where: {
        id: {
          in: items.map(i => i.productId)
        }
      },
      select: {
        id: true, name: true, prices: true
      }
    })

    data.user = { connect: { id: req.user.userId } }
    data.items = items.map((item, i) => ({
      quantity: item.quantity,
      product: products[i] as any // idk
    }))

    return this.ordersService.createOrder(data)
  }
}
