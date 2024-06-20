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
import { CouponsModule } from './modules/coupons.module';
import { UsersModule } from './modules/users.module';
import { OptionsModule } from './modules/options.module';
import { StatsModule } from './modules/stats.module';
import { InstancesModule } from './modules/instances.module';
import { PublicController } from './controllers/public.controller';
import { SubscriptionsModule } from './modules/subscriptions.module';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { ConfigsModule } from './modules/configs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    EventEmitterModule.forRoot(),
    MailModule,
    PrometheusModule.register(),
    BullModule.forRoot({
      // we use valkey instead of redis
      // redis: {
      //   host: 'localhost',
      //   port: 6379,
      // },
      defaultJobOptions:{
        attempts: 5,
        backoff: 1 * 60 * 1000 // retry after X ms
      }
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter
    }),

    AuthModule,
    ProductsModule,
    InstancesModule,
    CategoriesModule,
    ConfigsModule,
    PaymentsModule,
    SubscriptionsModule,
    OrdersModule,
    CouponsModule,
    DiskImagesModule,
    NotificationsModule,
    UsersModule,
    OptionsModule,
    StatsModule
  ],
  controllers: [AppController, PublicController],
  providers: [AppService],
})
export class AppModule { }
