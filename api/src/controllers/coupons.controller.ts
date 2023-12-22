import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CouponCode, Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CouponsService } from '../services/coupons.service';

@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(
    private readonly couponsService: CouponsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  coupons(@Request() req) {
    return this.couponsService.couponCodes({})
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  coupon(@Param('id') id: number) {
    return this.couponsService.couponCode({ id }, { products: true })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCoupon(
    @Body() body: CouponCode & { products: number[] }
  ) {
    const { products, ...coupon } = body
    const data: Prisma.CouponCodeCreateInput = coupon

    data.products = {
      connect: products.filter(p => !!p).map(id => ({ id }))
    }

    return this.couponsService.createCouponCode(data)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/validate')
  async validate(
    @Body() body: { code: string }
  ) {
    const coupons = await this.couponsService.couponCodes({
      where: {
        code: body.code
      },
      include: {
        products: {
          select: { id: true }
        }
      }
    })

    if (coupons.length === 0) {
      throw new HttpException("No such coupon code exists", HttpStatus.NOT_ACCEPTABLE)
    }

    const coupon = coupons[0]
    let error = ""
    if (!coupon.active) {
      error = "This coupon code is not available at the moment"
    } else if (coupon.startsAt && new Date() < coupon.startsAt) {
      error = "This coupon cannot be used yet"
    } else if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      error = "This coupon has expired"
    } else if (coupon.maxUses && await this.couponsService.orderCount(coupon.code) > coupon.maxUses) {
      error = "This coupon code cannot be redeemed anymore (max limit reached)"
    }

    if (error) {
      throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE)
    }

    return coupon
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateCoupon(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CouponCode & { products: number[], oldProducts: number[] }
  ) {
    const { products: productIds, oldProducts, ...coupon } = body
    const toRemove = oldProducts.filter(x => !productIds.includes(x))

    const data: Prisma.CouponCodeUpdateInput = coupon

    if (productIds) {
      data.products = {
        connect: productIds.map(id => ({ id })),
        disconnect: toRemove.map(id => ({ id }))
      }
    }

    return this.couponsService.updateCouponCode({
      where: { id },
      data
    })
  }
}
