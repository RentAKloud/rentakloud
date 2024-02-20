import { Injectable } from "@nestjs/common";
import { Address, Order, Prisma, Profile, User } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  private exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key]
    }
    return user
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    withPassword = false,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (user && !withPassword) {
      //@ts-ignore
      return this.exclude(user, ['password'])
    }

    return user
  }

  async userWithProfile(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User & { profile: Profile } | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { profile: true }
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        profile: { create: {} }
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    data.updatedAt = new Date()

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  @OnEvent('order.created')
  async updateAddressBook(order: Order) {
    const billingAddress: Address = {
      firstName: order.billingFirstName,
      lastName: order.billingLastName,
      address: order.billingAddress,
      address2: order.billingAddress2,
      city: order.billingCity,
      state: order.billingState,
      zip: order.billingZip,
      country: order.billingCountry,
      email: order.billingEmail,
      // phone: order.billingPhone,
      profileUserId: order.userId,
      id: null,
    }
    const shippingAddress: Address = {
      firstName: order.shippingFirstName,
      lastName: order.shippingLastName,
      address: order.shippingAddress,
      address2: order.shippingAddress2,
      city: order.shippingCity,
      state: order.shippingState,
      zip: order.shippingZip,
      country: order.shippingCountry,
      email: null,
      profileUserId: order.userId,
      id: null,
    }

    this.prisma.address.create({
      data: billingAddress
    })
  }
}