import { Controller, Get, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StatsService } from 'src/services/stats.service';
import { UsersService } from 'src/services/users.service';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  dashboard(@Request() req) {
    const userId = req.user.userId

    return this.statsService.userDashboard(userId)
  }

  @Get('admin')
  async category(@Request() req) {
    const userId = req.user.userId as number

    const user = await this.usersService.user({ id: userId })

    if (user.type !== UserType.Admin) {
      return new UnauthorizedException()
    }

    return this.statsService.adminDashboard()
  }
}
