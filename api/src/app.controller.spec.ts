import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/mail.module';
import { UsersModule } from './modules/users.module';
import { OrdersModule } from './modules/orders.module';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        MailModule,
        ConfigModule.forRoot({
          isGlobal: true
        }),
        UsersModule,
        OrdersModule,
        EventEmitterModule.forRoot(),
        JwtModule,
        BullBoardModule.forRoot({
          route: '',
          adapter: ExpressAdapter
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  afterAll(() => {
    app.close() // otherwise tests don't exit since adding the first `BullModule.registerQueue` in mail.module
  })
});
