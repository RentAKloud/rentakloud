import { Injectable } from "@nestjs/common";
import { CouponCode, Order, Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private ee: EventEmitter2,
  ) { }

  async order(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
  ): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: orderWhereUniqueInput,
    });
  }

  async orders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        coupons: true
      }
    });
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order & {
    coupons: CouponCode[];
  }> {
    const order = await this.prisma.order.create({
      data,
      include: {
        coupons: true
      }
    });

    this.ee.emit('order.created', order)

    return order
  }

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }): Promise<Order> {
    const { where, data } = params;
    return this.prisma.order.update({
      data,
      where,
    });
  }

  async deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<Order> {
    return this.prisma.order.delete({
      where,
    });
  }
}