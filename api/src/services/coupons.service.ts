import { Injectable } from "@nestjs/common";
import { CouponCode, Order, Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class CouponsService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async couponCode(
    couponCodeWhereUniqueInput: Prisma.CouponCodeWhereUniqueInput,
  ): Promise<CouponCode | null> {
    return this.prisma.couponCode.findUnique({
      where: couponCodeWhereUniqueInput,
    });
  }

  async couponCodes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CouponCodeWhereUniqueInput;
    where?: Prisma.CouponCodeWhereInput;
    orderBy?: Prisma.CouponCodeOrderByWithRelationInput;
  }): Promise<CouponCode[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.couponCode.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCouponCode(data: Prisma.CouponCodeCreateInput): Promise<CouponCode> {
    const couponCode = await this.prisma.couponCode.create({
      data,
    });

    return couponCode
  }

  async updateCouponCode(params: {
    where: Prisma.CouponCodeWhereUniqueInput;
    data: Prisma.CouponCodeUpdateInput;
  }): Promise<CouponCode> {
    const { where, data } = params;
    data.updatedAt = new Date()

    return this.prisma.couponCode.update({
      data,
      where,
    });
  }

  async deleteCouponCode(where: Prisma.CouponCodeWhereUniqueInput): Promise<CouponCode> {
    return this.prisma.couponCode.delete({
      where,
    });
  }

  async orderCount(code: string) {
    return (await this.prisma.order.findMany({
      where: {
        coupons: { every: { code } },
      }
    })).length
  }
}