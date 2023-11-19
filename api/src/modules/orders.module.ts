import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { OrdersController } from '../controllers/orders.controller';
import { OrdersService } from '../services/orders.service';
import { ProductsModule } from './products.module';
import { TaxRatesService } from '../services/tax-rates.service';

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService, TaxRatesService],
  exports: [OrdersService]
})
export class OrdersModule { }
