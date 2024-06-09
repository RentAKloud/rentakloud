import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users.module';
import { OrdersModule } from './orders.module';
import { BullModule } from '@nestjs/bull';
import { MailConsumer } from '../queue-consumers/mail.consumer';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'),
          port: config.get('SMTP_PORT'),
          secure: false,
          pool: true,
          auth: {
            user: config.get('SMTP_USER'),
            pass: config.get('SMTP_PASS'),
          },
        },
        defaults: {
          from: config.get('SMTP_DEFAULT_FROM'),
        },
        // preview: true, // opens up the SENT email in browser
        template: {
          dir: join(__dirname, '../../templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: join(__dirname, '../../templates/partials'),
            options: {
              strict: true,
            },
          },
        }
      }),
    }),

    UsersModule,
    OrdersModule,
    BullModule.registerQueue({
      name: 'mail',
    }),
    BullBoardModule.forFeature({
      name: 'mail',
      adapter: BullAdapter, //or use BullAdapter if you're using bull instead of bullMQ
    }),
  ],
  providers: [MailService, MailConsumer],
  exports: [MailService],
})
export class MailModule { }
