import {
  Controller,
  Request,
  Sse,
  UseGuards,
  MessageEvent,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SseService } from 'src/services/sse.service';

@ApiTags('SSE')
@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @UseGuards(JwtAuthGuard)
  @Sse('')
  sse(@Request() req): Observable<MessageEvent> {
    return this.sseService.subscribe('frontend');
  }
}
