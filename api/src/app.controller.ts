import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Hello world route for testing purposes.
   */
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
