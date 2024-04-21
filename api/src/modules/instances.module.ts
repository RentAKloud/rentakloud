import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaModule } from './prisma.module';
import { InstancesService } from '../services/instances.service';
import { InstancesController } from 'src/controllers/instances.controller';
import { ProductsModule } from './products.module';

@Module({
  imports: [PrismaModule, EventEmitterModule, ProductsModule],
  controllers: [InstancesController],
  providers: [InstancesService],
  exports: [InstancesService]
})
export class InstancesModule { }
