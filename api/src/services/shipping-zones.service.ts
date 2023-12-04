import { Injectable } from "@nestjs/common";
import { Prisma, ShippingMethod, ShippingZone } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ShippingZonesService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async shippingZone(
    shippingZoneWhereUniqueInput: Prisma.ShippingZoneWhereUniqueInput,
  ): Promise<ShippingZone | null> {
    return this.prisma.shippingZone.findUnique({
      where: shippingZoneWhereUniqueInput,
    });
  }

  async shippingZones(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ShippingZoneWhereUniqueInput;
    where?: Prisma.ShippingZoneWhereInput;
    orderBy?: Prisma.ShippingZoneOrderByWithRelationInput;
  }): Promise<(ShippingZone & {shippingMethods: ShippingMethod[]})[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shippingZone.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { shippingMethods: true }
    });
  }

  async createShippingZone(data: Prisma.ShippingZoneCreateInput): Promise<ShippingZone> {
    return this.prisma.shippingZone.create({
      data,
    });
  }

  async updateShippingZone(params: {
    where: Prisma.ShippingZoneWhereUniqueInput;
    data: Prisma.ShippingZoneUpdateInput;
  }): Promise<ShippingZone> {
    const { where, data } = params;
    return this.prisma.shippingZone.update({
      data,
      where,
    });
  }

  async deleteShippingZone(where: Prisma.ShippingZoneWhereUniqueInput): Promise<ShippingZone> {
    return this.prisma.shippingZone.delete({
      where,
    });
  }
}