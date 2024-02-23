import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Notification, Prisma } from '@prisma/client';
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
  orders(
    @Request() req,
    @Query() { status }
  ) {
    const filters: Prisma.NotificationWhereInput = {
      userId: req.user.userId,
    }

    if (status) filters.status = status

    return this.notificationsService.notifications({
      where: filters,
      orderBy: { createdAt: 'desc' }
    })
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
