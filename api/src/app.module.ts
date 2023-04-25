import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth.module';
import { PrismaModule } from './modules/prisma.module';
import { AppController } from './app.controller';
import { ProductsModule } from './modules/products.module';
import { OrdersModule } from './modules/orders.module';
import { PaymentsModule } from './modules/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,

    AuthModule,
    ProductsModule,
    PaymentsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
