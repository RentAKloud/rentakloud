import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  diskImages(@Request() req) {
    return this.diskImagesService.diskImages({ where: { } })
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
