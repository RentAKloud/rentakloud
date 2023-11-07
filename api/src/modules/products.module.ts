import { Module } from '@nestjs/common';
import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '../services/products.service';
import { PrismaModule } from './prisma.module';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [PrismaModule, EventEmitterModule],
  controllers: [ProductsController],
  providers: [ProductsService, EventEmitter2],
  exports: [ProductsService]
})
export class ProductsModule { }
