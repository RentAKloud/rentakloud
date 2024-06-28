import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaModule } from './prisma.module';
import { InstancesService } from '../services/instances.service';
import { InstancesController } from '../controllers/instances.controller';
import { ProductsModule } from './products.module';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ProvisioningConsumer } from '../queue-consumers/provisioning.consumer';

@Module({
  imports: [
    PrismaModule, EventEmitterModule, ProductsModule,
    BullModule.registerQueue({
      name: 'provisioning',
    }),
    BullBoardModule.forFeature({
      name: 'provisioning',
      adapter: BullAdapter,
    }),
  ],
  controllers: [InstancesController],
  providers: [InstancesService, ProvisioningConsumer],
  exports: [InstancesService]
})
export class InstancesModule { }
