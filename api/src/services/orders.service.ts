import { Injectable } from "@nestjs/common";
import { CouponCodeToOrder, Order, Prisma } from "@prisma/client";
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
      include: {
        coupons: true
      }
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
    coupons: CouponCodeToOrder[];
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
    data.updatedAt = new Date()

    const oldOrder = await this.order({ id: where.id })

    const order = await this.prisma.order.update({
      data,
      where,
    });

    if (oldOrder.status != data.status) {
      this.ee.emit('order.status.changed', order)
    }

    return order
  }

  async deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<Order> {
    return this.prisma.order.delete({
      where,
    });
  }
}