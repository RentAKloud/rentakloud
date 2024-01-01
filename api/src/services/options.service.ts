import { Injectable } from "@nestjs/common";
import { Prisma, Option } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class OptionsService {
  constructor(private prisma: PrismaService) { }

  private exclude<Option, Key extends keyof Option>(
    option: Option,
    keys: Key[]
  ): Omit<Option, Key> {
    for (let key of keys) {
      delete option[key]
    }
    return option
  }

  async option(
    optionWhereUniqueInput: Prisma.OptionWhereUniqueInput,
  ): Promise<Option | null> {
    const option = await this.prisma.option.findUnique({
      where: optionWhereUniqueInput,
    });

    return option
  }

  async options(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OptionWhereUniqueInput;
    where?: Prisma.OptionWhereInput;
    orderBy?: Prisma.OptionOrderByWithRelationInput;
  }): Promise<Option[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.option.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createOption(data: Prisma.OptionCreateInput): Promise<Option> {
    return this.prisma.option.create({
      data
    });
  }

  async updateOption(params: {
    where: Prisma.OptionWhereUniqueInput;
    data: Prisma.OptionUpdateInput;
  }): Promise<Option> {
    const { where, data } = params;

    return this.prisma.option.update({
      data,
      where,
    });
  }

  async deleteOption(where: Prisma.OptionWhereUniqueInput): Promise<Option> {
    return this.prisma.option.delete({
      where,
    });
  }
}