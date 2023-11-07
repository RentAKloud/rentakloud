import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { OrdersController } from '../controllers/orders.controller';
import { OrdersService } from '../services/orders.service';
import { ProductsModule } from './products.module';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [PrismaModule, ProductsModule, EventEmitterModule],
  controllers: [OrdersController],
  providers: [OrdersService, EventEmitter2],
  exports: [OrdersService]
})
export class OrdersModule { }
