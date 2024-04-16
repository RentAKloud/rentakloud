import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserToProducts } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InstancesService } from '../services/instances.service';

@ApiTags('Instances')
@Controller('instances')
export class InstancesController {
  constructor(
    private readonly instancesService: InstancesService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('')
  myInstances(@Request() req) {
    return this.instancesService.instances(req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  createInstances(@Request() req) {
    const { subscriptions } = req.body
    return this.instancesService.createInstances(subscriptions, req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/setup-vnc-tunnel')
  setupVNCTunnel(@Body() body) {
    const { vmId } = body
    return this.instancesService.initIPSecTunnel(vmId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  myInstance(
    @Param('id') id: string,
    @Request() req
  ) {
    return this.instancesService.instance(id, req.user.userId)
  }

  @Patch('/:id')
  updateInstance(@Param('id') id: string, @Body() data: UserToProducts) {
    return this.instancesService.updateInstance({
      where: {
        id
      },
      data
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteInstance(@Param('id') id: string) {
    return this.instancesService.deleteInstance(id)
  }
}
