import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaModule } from './modules/prisma.module';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth.module';
import { AppController } from './app.controller';
import { ProductsModule } from './modules/products.module';
import { OrdersModule } from './modules/orders.module';
import { PaymentsModule } from './modules/payments.module';
import { DiskImagesModule } from './modules/disk-images.module';
import { MailModule } from './modules/mail.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    EventEmitterModule.forRoot(),
    MailModule,
    PrometheusModule.register(),

    AuthModule,
    ProductsModule,
    PaymentsModule,
    OrdersModule,
    DiskImagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
