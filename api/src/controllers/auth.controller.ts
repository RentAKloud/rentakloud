import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private readonly jwtService: JwtService
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

  @Post('confirm-email')
  async confirmEmail(@Body() body) {
    const { token } = body

    try {
      // TODO 1 day expiry for token
      const payload = this.jwtService.verify(token) as { email: string, sub: number }
  
      await this.usersService.updateUser({
        where: {
          id: payload.sub,
          emailVerifiedAt: null
        },
        data: {
          emailVerifiedAt: new Date()
        }
      })

      return true
    } catch (err) {
      return false
    }
  }
}
