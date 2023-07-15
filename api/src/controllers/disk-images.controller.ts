import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { DiskImagesService } from 'src/services/disk-images.service';

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
    @Query('tags') tags: string[],
    @Query('exclude_tags') excludeTags: string[]
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
      filters.NOT = { tags: { hasSome: excludeTags } }
    }

    return this.diskImagesService.diskImages({
      where: filters
    })
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
