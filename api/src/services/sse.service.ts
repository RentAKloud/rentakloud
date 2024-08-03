import { Injectable, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class SseService {
  // private readonly logger = new Logger(SseService.name);
  private publisher: Redis;
  private subscriber: Redis;

  constructor(private readonly redisService: RedisService) {
    this.publisher = this.redisService.getClient('pub');
    this.subscriber = this.redisService.getClient('sub');

    // setInterval(() => {
    //   this.emit('main', { type: 'ping' });
    // }, 30_000);
  }

  subscribe(channel: string) {
    this.subscriber.subscribe(channel);
    return new Observable<MessageEvent>((observer) => {
      this.subscriber.on('message', (channel, message: MessageEvent) => {
        if (channel === 'frontend') {
          observer.next(message);
        }
      });
    });
  }

  emit(
    // channel: string,
    data?: MessageEvent,
  ) {
    this.publisher.publish('frontend', JSON.stringify(data));
  }
}
