import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CouponType, Order, Prisma, ProductType } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ParseOrderPipe, ParsedCreateOrderReq } from '../pipes/parse-order';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';
import { TaxRatesService } from '../services/tax-rates.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private productsService: ProductsService,
    private readonly taxRatesService: TaxRatesService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  orders(@Request() req) {
    return this.ordersService.orders({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    })
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
        product: products[i]
      }))

    const order = await this.ordersService.createOrder(data)

    // Calculate order total amount. This amount is used for confirmCardPayment at frontend.
    // excludes amount for subscriptions
    order.amount = new Prisma.Decimal(order.items.reduce<number>((sum: number, curr: { product: any, quantity: number }) => {
      if (curr.product.productType === ProductType.OnlineService) {
        return sum
      }
      const amount = curr.product.prices[0].saleAmount || curr.product.prices[0].amount
      return sum + amount * curr.quantity
    }, 0))
    const discounts = order.coupons.reduce((sum, curr) => {
      return (curr.type === CouponType.Percentage ?
        order.amount.toNumber() * curr.percentageDiscount / 100
        :
        curr.flatDiscount.toNumber()) + sum
    }, 0.0)

    // Get tax rates and calculate taxes
    const rates = await this.taxRatesService.taxRates({
      where: {
        countryCode: order.shippingCountry,
        // zip,
        stateCode: order.shippingState
      }
    })
    order.taxes = rates.map(r => ({
      title: r.name,
      amount: +(r.rate.toNumber() * order.amount.toNumber()).toFixed(2),
      rate: r.rate.toNumber()
    }))
    const taxesTotal = rates.reduce((sum, curr) => {
      return sum + order.amount.toNumber() * curr.rate.toNumber()
    }, 0)

    order.amount = new Prisma.Decimal(+(order.amount.toNumber() + taxesTotal - discounts).toFixed(2))

    this.ordersService.updateOrder({
      where: { id: order.id },
      data: {
        amount: order.amount,
        taxes: order.taxes
      }
    })

    return order
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateOrder(@Body() order: Order) {
    return this.ordersService.updateOrder({
      where: { id: order.id },
      data: order
    })
  }

  @UseGuards(JwtAuthGuard)
  @Post('/estimate-taxes')
  async estimateTaxes(@Body() body) {
    const { country, zip, state, amount } = body

    const rates = await this.taxRatesService.taxRates({
      where: {
        countryCode: country,
        // zip,
        stateCode: state
      }
    })

    return rates.map(r => ({
      title: r.name,
      amount: amount * r.rate.toNumber(),
    }))
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
