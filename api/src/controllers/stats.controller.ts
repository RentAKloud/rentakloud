import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StatsService } from 'src/services/stats.service';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) { }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  dashboard(@Request() req) {
    const userId = req.user.userId

    return this.statsService.userDashboard(userId)
  }

  @Get('admin')
  category(@Request() req) {
    const userId = req.user.userId
  }
}
