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
import { NotificationsModule } from './modules/notifications.module';
import { CategoriesModule } from './modules/categories.module';

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
    CategoriesModule,
    PaymentsModule,
    OrdersModule,
    DiskImagesModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
