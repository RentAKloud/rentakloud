import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { OrdersController } from '../controllers/orders.controller';
import { OrdersService } from '../services/orders.service';
import { ProductsModule } from './products.module';
import { TaxRatesService } from '../services/tax-rates.service';
import { UsersModule } from './users.module';
import { CouponsModule } from './coupons.module';
import { ShippingZonesService } from '../services/shipping-zones.service';
import { ShippingMethodsService } from '../services/shipping-methods.service';

@Module({
  imports: [PrismaModule, ProductsModule, UsersModule, CouponsModule],
  controllers: [OrdersController],
  providers: [OrdersService, TaxRatesService, ShippingZonesService, ShippingMethodsService],
  exports: [OrdersService]
})
export class OrdersModule { }
