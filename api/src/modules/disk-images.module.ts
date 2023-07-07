import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { DiskImagesController } from 'src/controllers/disk-images.controller';
import { DiskImagesService } from 'src/services/disk-images.service';

@Module({
  imports: [PrismaModule],
  controllers: [DiskImagesController],
  providers: [DiskImagesService],
  exports: [DiskImagesService]
})
export class DiskImagesModule { }
