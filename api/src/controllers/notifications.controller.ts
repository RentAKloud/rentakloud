import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Notification } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { NotificationService } from 'src/services/notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  orders(@Request() req) {
    return this.notificationsService.notifications({ where: { userId: req.user.userId } })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  order(@Param('id') id: string) {
    return this.notificationsService.notification({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createNotification(
    @Body() data
  ) {
    return await this.notificationsService.createNotification(data)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateNotification(
    @Param('id') id: string,
    @Body() body: Notification
  ) {
    this.notificationsService.updateNotification({
      where: { id },
      data: { ...body }
    })
  }
}
