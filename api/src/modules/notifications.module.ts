import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { ProductsModule } from './products.module';
import { NotificationsController } from 'src/controllers/notifications.controller';
import { NotificationService } from 'src/services/notifications.service';

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [NotificationsController],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationsModule { }
