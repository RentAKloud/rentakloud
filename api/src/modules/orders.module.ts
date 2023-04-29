import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { OrdersController } from 'src/controllers/orders.controller';
import { OrdersService } from 'src/services/orders.service';
import { ProductsModule } from './products.module';

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule { }
