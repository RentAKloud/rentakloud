import { Injectable } from "@nestjs/common";
import { DiskImage, Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class DiskImagesService {
  constructor(
    private prisma: PrismaService,
    private ee: EventEmitter2,
  ) { }

  async diskImage(
    diskImageWhereUniqueInput: Prisma.DiskImageWhereUniqueInput,
  ): Promise<DiskImage | null> {
    return this.prisma.diskImage.findUnique({
      where: diskImageWhereUniqueInput,
    });
  }

  async diskImages(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DiskImageWhereUniqueInput;
    where?: Prisma.DiskImageWhereInput;
    orderBy?: Prisma.DiskImageOrderByWithRelationInput;
  }): Promise<DiskImage[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.diskImage.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createDiskImage(data: Prisma.DiskImageCreateInput): Promise<DiskImage> {
    const diskImage = await this.prisma.diskImage.create({
      data,
    });

    this.ee.emit('disk-image.created', diskImage)

    return diskImage
  }

  async updateDiskImage(params: {
    where: Prisma.DiskImageWhereUniqueInput;
    data: Prisma.DiskImageUpdateInput;
  }): Promise<DiskImage> {
    const { where, data } = params;
    return this.prisma.diskImage.update({
      data,
      where,
    });
  }

  async deleteDiskImage(where: Prisma.DiskImageWhereUniqueInput): Promise<DiskImage> {
    return this.prisma.diskImage.delete({
      where,
    });
  }
}