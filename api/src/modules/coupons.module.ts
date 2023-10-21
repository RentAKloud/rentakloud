import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { CouponsController } from 'src/controllers/coupons.controller';
import { CouponsService } from 'src/services/coupons.service';

@Module({
  imports: [PrismaModule],
  controllers: [CouponsController],
  providers: [CouponsService],
  exports: [CouponsService]
})
export class CouponsModule { }
