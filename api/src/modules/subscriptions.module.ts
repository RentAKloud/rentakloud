import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users.module';
import { SubscriptionsService } from 'src/services/subscriptions.service';
import { SubscriptionsController } from 'src/controllers/subscriptions.controller';
import { PaymentsModule } from './payments.module';

@Module({
  imports: [PrismaModule, UsersModule, PaymentsModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService]
})
export class SubscriptionsModule { }
