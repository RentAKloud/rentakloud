import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CouponType, Order, Prisma, Product, ProductType, UserType } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ParseOrderPipe, ParsedCreateOrderReq } from '../pipes/parse-order';
import { OrdersService } from '../services/orders.service';
import { ProductsService } from '../services/products.service';
import { TaxRatesService } from '../services/tax-rates.service';
import { UsersService } from '../services/users.service';
import { CouponsService } from '../services/coupons.service';
import { ShippingZonesService } from '../services/shipping-zones.service';
import { ShippingMethodsService } from '../services/shipping-methods.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private productsService: ProductsService,
    private readonly taxRatesService: TaxRatesService,
    private readonly usersService: UsersService,
    private readonly couponsService: CouponsService,
    private readonly shippingZonesService: ShippingZonesService,
    private readonly shippingMethodsService: ShippingMethodsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async orders(@Request() req) {
    const user = await this.usersService.user({ id: req.user.userId })

    const where: Prisma.OrderWhereInput = {}
    if (user.type !== UserType.Admin) {
      where.userId = user.id
    }

    return this.ordersService.orders({
      where,
      orderBy: { createdAt: 'desc' }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async order(@Request() req, @Param('id') id: number) {
    const user = await this.usersService.user({ id: req.user.userId })

    const where: Prisma.OrderWhereUniqueInput = { id }
    if (user.type !== UserType.Admin) {
      where.userId = user.id
    }

    return this.ordersService.order(where)
  }

  // This is for physical products only. We don't create orders for products of type OnlineService (subscription based)
  // For subscription based/OnlineService products, see products.controller
  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(
    @Request() req,
    @Body(ParseOrderPipe) data: ParsedCreateOrderReq
  ) {
    const couponIds = req.body.couponCodes.map(cc => cc.id)
    const { items } = data
    const shippingMethodId = req.body.shippingMethod.id

    // check for duplicate coupons
    if (couponIds.length > 0 && couponIds.length != new Array(new Set(couponIds)).length) {
      return new BadRequestException("A coupon code can be used only once per order")
    }
    const coupons = await this.couponsService.couponCodes({
      where: {
        id: { in: couponIds }
      }
    })
    data.coupons = {
      create: coupons.map(c => ({
        couponCodeId: c.id,
        title: c.title,
        code: c.code,
        type: c.type,
        flatDiscount: c.flatDiscount,
        percentageDiscount: c.percentageDiscount
      }))
    }

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

    // TODO stock validation

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

    // Shipping costs
    const sm = await this.shippingMethodsService.shippingMethod({ id: shippingMethodId })
    const shippingTotal = await this.evalShippingCost(sm.cost, products.map(p => p.id))
    order.shipping = {
      ...sm,
      amount: shippingTotal.toFixed(2)
    }

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

    const amountTotal = order.amount.toNumber() + shippingTotal + taxesTotal - discounts
    order.amount = new Prisma.Decimal(amountTotal.toFixed(2))

    this.ordersService.updateOrder({
      where: { id: order.id },
      data: {
        amount: order.amount,
        taxes: order.taxes,
        shipping: order.shipping
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
    const { country, zip, state } = body.address
    const amount = body.amount

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

  @UseGuards(JwtAuthGuard)
  @Post('/available-shipping-methods')
  async availableShippingMethods(@Body() body) {
    const { country, zip, state, city } = body.address
    const { productIds } = body

    let zones = await this.shippingZonesService.shippingZones({
      where: {
        countries: {
          has: country
        }
      }
    })

    if (zones.length === 0) {
      zones = await this.shippingZonesService.shippingZones({
        where: { countries: { equals: null } }
      })
    }

    if (zones.length === 0) {
      return []
    }

    return await Promise.all(zones[0].shippingMethods.map(async (sm) => {
      return {
        ...sm,
        cost: await this.evalShippingCost(sm.cost, productIds)
      }
    }))
  }

  async evalShippingCost(cost: string, productIds: number[]): Promise<number> {
    let products: Product[]
    let w = 0
    if (cost.includes("w")) {
      if (!products) {
        products = await this.productsService.products({
          where: {
            id: { in: productIds },
          },
        })
      }
      w = products.reduce((sum, curr) => sum + curr.weight.toNumber(), 0)
    }
    return eval(cost)
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
