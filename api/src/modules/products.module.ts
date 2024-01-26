import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '../services/products.service';
import { PrismaModule } from './prisma.module';
import { InstancesService } from '../services/instances.service';

@Module({
  imports: [PrismaModule, EventEmitterModule],
  controllers: [ProductsController],
  providers: [ProductsService, InstancesService],
  exports: [ProductsService]
})
export class ProductsModule { }
