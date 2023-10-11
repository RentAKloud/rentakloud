import { Injectable } from "@nestjs/common";
import { Prisma, Category } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async category(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: categoryWhereUniqueInput,
    });
  }

  async categories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.category.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async categoriesWithSelect(params: {
    where?: Prisma.CategoryWhereInput;
    select?: Prisma.CategorySelect;
  }): Promise<Partial<Category>[]> {
    const { where, select } = params
    return this.prisma.category.findMany({
      where,
      select,
    })
  }

  async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }

  async updateCategory(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<Category> {
    const { where, data } = params;
    return this.prisma.category.update({
      data,
      where,
    });
  }

  async deleteCategory(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
    return this.prisma.category.delete({
      where,
    });
  }
}