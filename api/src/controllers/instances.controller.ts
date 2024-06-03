import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Redirect, Request, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InstancesService } from '../services/instances.service';
import { CreateInstance, Plan } from 'src/types/instances.dto';
import { ProductsService } from 'src/services/products.service';
import { Instance, InstanceStatus } from '@prisma/client';

type InstanceCallback = {
  status: InstanceStatus
  vncPath: string
  publicIp: string
  privateIp: string
}

@ApiTags('Instances')
@Controller('instances')
export class InstancesController {
  constructor(
    private readonly instancesService: InstancesService,
    private readonly productsService: ProductsService
  ) { }

  @Get('test-provision')
  test(
    @Query('vmId') vmId,
    @Query('custId') custId,
    @Query('slotId') slotId,
    @Query('cpus') cpus,
    @Query('ram') ram,
    @Query('ssd') ssd,
    @Query('hdd') hdd,
  ) {
    //@ts-ignore
    return this.instancesService.initProvisioning(
      {
        // @ts-ignore
        config: {
          cpus, ram, ssd, hdd
        },
      },
      vmId,
      custId,
      slotId
    )
  }

  @Get('vm[0-9]+')
  @Redirect()
  async proxy(
    @Request() req,
    @Response() res
  ) {
    const vmId = +/[0-9]+/.exec(req.path)[0]
    const instance = await this.instancesService.instance({ vmId })
    if (!instance) {
      throw new HttpException(`Instance ${vmId} not found`, HttpStatus.NOT_FOUND)
    }
    return { url: `/vm${vmId}-${instance.hostIp}-${instance.wsPort}` }
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  myInstances(@Request() req) {
    return this.instancesService.instances({
      where: { userId: req.user.userId }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createInstances(@Request() req) {
    const instanceData: CreateInstance[] = req.body.instances
    const products = await this.productsService.products({
      where: {
        id: { in: instanceData.map(i => i.productId) }
      }
    })

    instanceData.forEach((i, index) => {
      i.configId = (products[index].prices.find(
        (plan: Plan) => !!plan.prices.find(p => p.priceId === i.priceId)
      ) as Plan).configId
    })

    return this.instancesService.createInstances(instanceData, req.user.userId)
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
    return this.instancesService.instance({ id, userId: req.user.userId })
  }

  @Patch('/:id')
  updateInstance(@Param('id') id: string, @Body() data: Instance) {
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

  // TODO secure using a custom guard
  // validate body - should only include stuff in type
  @Post('/callback/:vmId')
  callback(@Param('vmId') vmId: number, @Body() data: InstanceCallback) {
    return this.instancesService.updateInstance({
      where: {
        vmId
      },
      data
    })
  }
}
