import { Injectable } from "@nestjs/common";
import { Order, OrderStatus, Prisma, Product, UserProductStatus } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private ee: EventEmitter2
  ) { }

  async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
      include: {
        categories: true
      },
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
    data.updatedAt = new Date()

    return this.prisma.product.update({
      data,
      where,
      include: {
        categories: true
      },
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


  async createUserProducts(products: { subscriptionId: string, priceId: string, productId: number }[], userId: number) {
    return this.prisma.userToProducts.createMany({
      data: products.map((i) => {
        return {
          userId: userId,
          productId: i.productId,
          subscriptionId: i.subscriptionId,
          status: UserProductStatus.Active,
        }
      })
    })
  }

  async deleteUserProduct(id: string) {
    const result = await this.prisma.userToProducts.delete({ where: { id } })

    this.ee.emit("user_product.deleted", result)

    return result
  }

  @OnEvent("order.created")
  async inventoryManagement(order: Order) {
    order.items.forEach((i: { product: any, quantity: number }) => {
      this.updateProduct({
        where: { id: i.product.id },
        data: { stock: { decrement: i.quantity } }
      })
    })
  }

  @OnEvent('order.status.changed')
  async moreInventoryManagement(order: Order) {
    const statuses: OrderStatus[] = [OrderStatus.Cancelled]

    if (statuses.includes(order.status)) {
      order.items.forEach((i: { product: any, quantity: number }) => {
        this.updateProduct({
          where: { id: i.product.id },
          data: { stock: { increment: i.quantity } }
        })
      })
    }
  }
}