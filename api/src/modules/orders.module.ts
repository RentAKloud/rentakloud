import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { OrdersController } from 'src/controllers/orders.controller';
import { OrdersService } from 'src/services/orders.service';
import { UsersModule } from './users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule { }
