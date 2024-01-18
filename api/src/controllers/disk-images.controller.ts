import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { DiskImagesService } from 'src/services/disk-images.service';
import { DiskImagesFindManyQuery, DiskImagesQuery } from 'src/types/disk-images.dto';

@ApiTags('DiskImages')
@Controller('disk-images')
export class DiskImagesController {
  constructor(
    private readonly diskImagesService: DiskImagesService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  diskImages(
    @Request() req,
    @Query() { tags, excludeTags, page, pageSize, q }: DiskImagesQuery
  ) {
    const filters: Prisma.DiskImageWhereInput = {
      OR: [
        { createdBy: { id: req.user.userId } },
        { createdBy: null }
      ]
    }

    if (tags) {
      filters.AND = { tags: { hasEvery: tags } }
    }
    if (excludeTags) {
      filters.NOT = { tags: { hasSome: excludeTags.filter(x => !!x) } }
    }
    if (q) {
      filters.AND = {
        ...filters.AND,
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { osName: { contains: q, mode: 'insensitive' } }
        ]
      }
    }

    const query: DiskImagesFindManyQuery = {
      where: filters
    }

    if (page && pageSize) {
      query.skip = (page - 1) * pageSize
      query.take = pageSize
    }

    return this.diskImagesService.diskImages(query)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  diskImage(@Param('id') id: number) {
    return this.diskImagesService.diskImage({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createDiskImage(
    @Body() data
  ) {
    const diskImage = await this.diskImagesService.createDiskImage(data)

    return diskImage
  }
}
