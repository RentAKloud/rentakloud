import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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
    @Body() data: CreateOrderReq
  ) {
    const { billingAddress, shippingAddress, shippingSameAsBilling, orderNotes, items } = data
    const _shippingAddress = shippingSameAsBilling ? billingAddress : shippingAddress

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

    // TODO maybe can use a transformation pipe to clean this mess
    const orderInput = {
      billingFirstName: billingAddress.firstName,
      billingLastName: billingAddress.lastName,
      billingAddress: billingAddress.address,
      billingAddress2: billingAddress.address2,
      billingEmail: billingAddress.email,
      billingCity: billingAddress.city,
      billingState: billingAddress.state,
      billingZip: billingAddress.zip,
      billingCountry: billingAddress.country,

      shippingFirstName: _shippingAddress.firstName,
      shippingLastName: _shippingAddress.lastName,
      shippingAddress: _shippingAddress.address,
      shippingAddress2: _shippingAddress.address2,
      shippingCity: _shippingAddress.city,
      shippingState: _shippingAddress.state,
      shippingZip: _shippingAddress.zip,
      shippingCountry: _shippingAddress.country,

      notes: orderNotes,
      user: { connect: { id: req.user.userId } },
      items: items.map((item, i) => ({
        quantity: item.quantity,
        product: products[i]
      })) as any[],
    }

    return this.ordersService.createOrder(orderInput)
  }
}
