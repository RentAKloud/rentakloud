import { Module } from '@nestjs/common';
import { SseController } from 'src/controllers/sse.controller';
import { SseService } from 'src/services/sse.service';

@Module({
  imports: [],
  controllers: [SseController],
  providers: [SseService],
  exports: [SseService],
})
export class SseModule {}
