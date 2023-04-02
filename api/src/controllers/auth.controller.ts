import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { RegisterReq } from 'src/types/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req): string {
    return req.user;
  }

  @Post('register')
  register(@Body() data: RegisterReq) {
    return this.authService.register(data);
  }
}
