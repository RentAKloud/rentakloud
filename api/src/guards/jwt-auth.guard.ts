import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    if (request && request.query['token'] && !request.header('authorization')) {
      (request.headers['authorization'] as any) = "Bearer " + request.query['token'];
    }

    return super.canActivate(context);
  }
}