import { Injectable } from "@nestjs/common";
import { DiskImage, Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DiskImagesFindManyQuery } from "src/types/disk-images.dto";
import { Paginated } from "src/types/common.dto";

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

  // https://github.com/prisma/prisma/issues/7550#issuecomment-1537160913
  async diskImages(params: DiskImagesFindManyQuery): Promise<Paginated<DiskImage>> {
    // const { skip, take, cursor, where, orderBy } = params;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.diskImage.findMany(params),
      this.prisma.diskImage.count({ where: params.where })
    ])

    return {
      data,
      total
    }
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