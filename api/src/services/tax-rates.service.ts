import { Injectable } from "@nestjs/common";
import { Prisma, TaxRate } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class TaxRatesService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async taxRate(
    taxRateWhereUniqueInput: Prisma.TaxRateWhereUniqueInput,
  ): Promise<TaxRate | null> {
    return this.prisma.taxRate.findUnique({
      where: taxRateWhereUniqueInput,
    });
  }

  async taxRates(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaxRateWhereUniqueInput;
    where?: Prisma.TaxRateWhereInput;
    orderBy?: Prisma.TaxRateOrderByWithRelationInput;
  }): Promise<TaxRate[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.taxRate.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTaxRate(data: Prisma.TaxRateCreateInput): Promise<TaxRate> {
    return this.prisma.taxRate.create({
      data,
    });
  }

  async updateTaxRate(params: {
    where: Prisma.TaxRateWhereUniqueInput;
    data: Prisma.TaxRateUpdateInput;
  }): Promise<TaxRate> {
    const { where, data } = params;
    return this.prisma.taxRate.update({
      data,
      where,
    });
  }

  async deleteTaxRate(where: Prisma.TaxRateWhereUniqueInput): Promise<TaxRate> {
    return this.prisma.taxRate.delete({
      where,
    });
  }
}