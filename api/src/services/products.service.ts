import { Injectable } from "@nestjs/common";
import { Order, Prisma, Product } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { OnEvent } from "@nestjs/event-emitter";
import { randomUUID } from "crypto";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        categories: true
      },
    });
  }

  async productsWithSelect(params: {
    where?: Prisma.ProductWhereInput;
    select?: Prisma.ProductSelect;
  }): Promise<Partial<Product>[]> {
    const { where, select } = params
    return this.prisma.product.findMany({
      where,
      select,
    })
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { where, data } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }

  async activeProducts(userId: number) {
    return this.prisma.userToProducts.findMany({
      where: { userId },
      include: { product: true }
    })
  }

  @OnEvent('order.created')
  async newUserProductsFromOrder(order: Order) {
    await this.prisma.userToProducts.createMany({
      data: order.items.map((i: any) => {
        return {
          userId: order.userId,
          productId: i.product.id,
          subscriptionId: randomUUID(), // TODO
        }
      })
    })
  }
}