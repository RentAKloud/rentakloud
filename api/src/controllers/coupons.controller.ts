import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CouponCode } from '@prisma/client';
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
    return this.couponsService.couponCode({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCoupon(
    @Body() data
  ) {
    const couponCode = await this.couponsService.createCouponCode(data)

    return couponCode
  }

  @UseGuards(JwtAuthGuard)
  @Post('/validate')
  async validate(
    @Body() body: { code: string }
  ) {
    const coupons = await this.couponsService.couponCodes({
      where: {
        code: body.code
      }
    })

    if (coupons.length === 0) {
      throw new HttpException("No such coupon code exists", HttpStatus.NOT_ACCEPTABLE)
    }

    const coupon = coupons[0]
    if (!coupon.active) {
      throw new HttpException("This coupon code is not available at the moment", HttpStatus.NOT_ACCEPTABLE)
    } else if (coupon.startsAt && new Date() < coupon.startsAt) {
      throw new HttpException("This coupon cannot be used yet", HttpStatus.NOT_ACCEPTABLE)
    } else if (coupon.expiresAt && new Date() > coupon.expiresAt) {
      throw new HttpException("This coupon has expired", HttpStatus.NOT_ACCEPTABLE)
    } else if (coupon.maxUses && await this.couponsService.orderCount(coupon.code) > coupon.maxUses) {
      throw new HttpException("This coupon code cannot be redeemed anymore (max limit reached)", HttpStatus.NOT_ACCEPTABLE)
    }

    return coupon
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateCoupon(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CouponCode
  ) {
    return this.couponsService.updateCouponCode({
      where: { id },
      data: body
    })
  }
}
