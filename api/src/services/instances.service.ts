import { Injectable } from "@nestjs/common";
import { Prisma, UserProductStatus } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class InstancesService {
  constructor(
    private prisma: PrismaService,
    private ee: EventEmitter2
  ) { }
  async userProducts(userId: number) {
    return this.prisma.userToProducts.findMany({
      where: { userId },
      include: { product: true }
    })
  }

  async userProduct(id: string, userId: number) {
    return this.prisma.userToProducts.findUnique({
      where: { id, userId },
      include: { product: true }
    })
  }

  async createUserProducts(products: { subscriptionId: string, priceId: string, productId: number }[], userId: number) {
    return this.prisma.userToProducts.createMany({
      data: products.map((i) => {
        return {
          userId: userId,
          productId: i.productId,
          subscriptionId: i.subscriptionId,
          status: UserProductStatus.Pending,
        }
      })
    })
  }

  async updateUserProduct(params: {
    where: Prisma.UserToProductsWhereUniqueInput;
    data: Prisma.UserToProductsUpdateInput;
  }) {
    const { where, data } = params;
    data.updatedAt = new Date()

    const rv = await this.prisma.userToProducts.update({
      data,
      where,
      include: {
        product: true
      },
    });

    if (data.addons) {
      this.ee.emit("instance.addons.updated", rv.subscriptionId, data.addons)
    }

    return rv
  }

  async deleteUserProduct(id: string) {
    const result = await this.prisma.userToProducts.delete({ where: { id } })

    this.ee.emit("user_product.deleted", result)

    return result
  }
}