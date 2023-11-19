import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/mail.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users.module';
import { OrdersModule } from './modules/orders.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        MailModule,
        ConfigModule,
        UsersModule,
        OrdersModule,
        EventEmitterModule.forRoot()
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
});
