import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { CategoriesController } from 'src/controllers/categories.controller';
import { CategoriesService } from 'src/services/categories.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule { }
