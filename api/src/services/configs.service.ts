import { Injectable } from "@nestjs/common";
import { Config, Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { Paginated } from "src/types/common.dto";

@Injectable()
export class ConfigsService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async config(
    configWhereUniqueInput: Prisma.ConfigWhereUniqueInput,
  ): Promise<Config | null> {
    return this.prisma.config.findUnique({
      where: configWhereUniqueInput,
    });
  }

  async configs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ConfigWhereUniqueInput;
    where?: Prisma.ConfigWhereInput;
    orderBy?: Prisma.ConfigOrderByWithRelationInput;
  }): Promise<Paginated<Config>> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.config.findMany(params),
      this.prisma.config.count({ where: params.where })
    ])

    return {
      data,
      total
    }
  }

  async createConfig(data: Prisma.ConfigCreateInput): Promise<Config> {
    const config = await this.prisma.config.create({
      data,
    });

    return config
  }

  async updateConfig(params: {
    where: Prisma.ConfigWhereUniqueInput;
    data: Prisma.ConfigUpdateInput;
  }): Promise<Config> {
    const { where, data } = params;
    return this.prisma.config.update({
      data,
      where,
    });
  }

  async deleteConfig(where: Prisma.ConfigWhereUniqueInput): Promise<Config> {
    return this.prisma.config.delete({
      where,
    });
  }
}