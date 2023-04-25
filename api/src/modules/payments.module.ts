import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { PaymentsController } from 'src/controllers/payments.controller';
import { PaymentsService } from 'src/services/payments.service';
import { UsersModule } from './users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService]
})
export class PaymentsModule { }
