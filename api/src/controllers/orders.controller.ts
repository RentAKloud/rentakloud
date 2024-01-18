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
import { OrderItem, CartItem } from 'src/types/order';

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
    if (couponIds.length > 0 && couponIds.length != Array.from(new Set(couponIds)).length) {
      return new BadRequestException("A coupon code can be used only once per order")
    }
    const coupons = await this.couponsService.couponCodes({
      where: {
        id: { in: couponIds }
      },
      include: {
        products: {
          select: { id: true }
        }
      }
    })
    // TODO validate coupons
    data.coupons = {
      create: coupons.map(c => ({
        couponCodeId: c.id,
        title: c.title,
        code: c.code,
        type: c.type,
        flatDiscount: c.flatDiscount,
        percentageDiscount: c.percentageDiscount,
        products: c.products.map(p => p.id)
      }))
    }

    // TODO we should also just select the specific price
    const products = await this.productsService.products({
      where: {
        id: {
          in: items.map(i => i.productId)
        },
      },
    })
    const productsSelectedFields = products.map(p => ({
      id: p.id, name: p.name, prices: p.prices, productType: p.productType
    }))

    data.user = { connect: { id: req.user.userId } }
    data.items = items
      .filter((_, i) => products[i].productType === ProductType.Physical)
      .map((item, i) => ({
        quantity: item.quantity,
        product: productsSelectedFields[i]
      }))

    // TODO stock validation

    // Calculate order total amount. This amount is used for confirmCardPayment at frontend.
    // excludes amount for subscriptions
    const subTotal = new Prisma.Decimal(data.items.reduce<number>((sum: number, curr: OrderItem) => {
      if (curr.product.productType === ProductType.OnlineService) {
        return sum
      }
      const amount = curr.product.prices[0].saleAmount || curr.product.prices[0].amount
      return sum + amount * curr.quantity
    }, 0))
    const discounts = coupons.reduce((sum, curr) => {
      const apply = (value: number) => curr.type === CouponType.Percentage ?
        value * curr.percentageDiscount / 100 :
        +curr.flatDiscount

      const applicableProducts = curr.products.map(p => p.id)
      if (applicableProducts.length > 0) {
        return data.items.reduce<number>(
          (psum, pcurr: OrderItem) =>
            applicableProducts.includes(pcurr.product.id) ?
              apply(pcurr.product.prices[0].amount * pcurr.quantity) :
              psum
          , 0) + sum
      }

      return apply(subTotal.toNumber()) + sum
    }, 0.0)

    // Shipping costs
    const sm = await this.shippingMethodsService.shippingMethod({ id: shippingMethodId })
    const shippingTotal = this.evalShippingCost(sm.cost, products)
    data.shipping = {
      ...sm,
      amount: shippingTotal.toFixed(2)
    }

    // Get tax rates and calculate taxes
    const rates = await this.taxRatesService.taxRates({
      where: {
        countryCode: data.shippingCountry,
        // zip,
        stateCode: data.shippingState
      }
    })
    data.taxes = rates.map(r => ({
      title: r.name,
      amount: (r.rate.toNumber() * subTotal.toNumber()).toFixed(2),
      rate: r.rate.toNumber()
    }))
    const taxesTotal = rates.reduce((sum, curr) => {
      return sum + subTotal.toNumber() * curr.rate.toNumber()
    }, 0)

    const amountTotal = subTotal.toNumber() + shippingTotal + taxesTotal - discounts
    data.amount = new Prisma.Decimal(amountTotal.toFixed(2))

    const order = await this.ordersService.createOrder(data)

    // TODO save address for reuse in user profile (maybe in users.service)
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

    const products = await this.productsService.products({
      where: {
        id: { in: productIds },
        productType: ProductType.Physical
      },
    })

    // if there is no physical product
    if (!products.some((p) => p.productType === ProductType.Physical)) {
      return []
    }

    return await Promise.all(zones[0].shippingMethods.map(async (sm) => {
      return {
        ...sm,
        cost: this.evalShippingCost(sm.cost, products)
      }
    }))
  }

  @UseGuards(JwtAuthGuard)
  @Post('/available-coupons')
  async availableCoupons(@Body() body: { items: CartItem[] }) {
    const { items } = body
    const productIds = items.map(i => i.productId)

    const coupons = await this.couponsService.couponCodes({
      where: {
        products: {
          every: {
            id: { in: productIds }
          }
        },
        active: true,
        isPrivate: false,
        OR: [
          { startsAt: { lte: new Date() } },
          { startsAt: null }
        ]
      }
    })

    // TODO check for validity
    // coupons do get revalidated at frontend when applied, so need to validate here?
    // probably because shouldnt show coupons that cant be used

    return coupons
  }

  evalShippingCost(cost: string, products: Product[]): number {
    let w = 0
    if (cost.includes("w")) {
      w = products.reduce((sum, curr) => sum + (curr.weight?.toNumber() || 0), 0)
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
