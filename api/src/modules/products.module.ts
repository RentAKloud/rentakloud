import { Module } from '@nestjs/common';
import { ProductsController } from 'src/controllers/products.controller';
import { ProductsService } from 'src/services/products.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule { }
