import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { CouponsController } from '../controllers/coupons.controller';
import { CouponsService } from '../services/coupons.service';

@Module({
  imports: [PrismaModule],
  controllers: [CouponsController],
  providers: [CouponsService],
  exports: [CouponsService]
})
export class CouponsModule { }
