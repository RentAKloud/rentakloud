import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { daysAgo } from "src/utils";

@Injectable()
export class StatsService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async userDashboard(userId: number) {
    return {
      instances: await this.prisma.instance.count({ where: { userId } }),
      orders: await this.prisma.order.count({ where: { userId } }),
      ordersInLastMonth: await this.prisma.order.count({ where: { userId, createdAt: { gte: daysAgo(30) } } }),
    }
  }

  async adminDashboard() {
    return {
      instances: await this.prisma.instance.count({ where: { } }),
      orders: await this.prisma.order.count({ where: { } }),
      ordersInLastMonth: await this.prisma.order.count({ where: { createdAt: { gte: daysAgo(30) } } }),
    }
  }
}