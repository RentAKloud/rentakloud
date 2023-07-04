import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';
import { LoginReq, RegisterReq } from 'src/types/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginReq
  })
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() data: RegisterReq) {
    return this.authService.register(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    return this.usersService.user({ id: req.user.userId })
  }
}
