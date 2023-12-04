import { Injectable } from "@nestjs/common";
import { Prisma, ShippingMethod } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ShippingMethodsService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async shippingMethod(
    shippingMethodWhereUniqueInput: Prisma.ShippingMethodWhereUniqueInput,
  ): Promise<ShippingMethod | null> {
    return this.prisma.shippingMethod.findUnique({
      where: shippingMethodWhereUniqueInput,
    });
  }

  async shippingMethods(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ShippingMethodWhereUniqueInput;
    where?: Prisma.ShippingMethodWhereInput;
    orderBy?: Prisma.ShippingMethodOrderByWithRelationInput;
  }): Promise<ShippingMethod[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shippingMethod.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createShippingMethod(data: Prisma.ShippingMethodCreateInput): Promise<ShippingMethod> {
    return this.prisma.shippingMethod.create({
      data,
    });
  }

  async updateShippingMethod(params: {
    where: Prisma.ShippingMethodWhereUniqueInput;
    data: Prisma.ShippingMethodUpdateInput;
  }): Promise<ShippingMethod> {
    const { where, data } = params;
    return this.prisma.shippingMethod.update({
      data,
      where,
    });
  }

  async deleteShippingMethod(where: Prisma.ShippingMethodWhereUniqueInput): Promise<ShippingMethod> {
    return this.prisma.shippingMethod.delete({
      where,
    });
  }
}