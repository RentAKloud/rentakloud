import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserToProducts } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InstancesService } from '../services/instances.service';
import { CreateInstance, Plan } from 'src/types/instances.dto';
import { ProductsService } from 'src/services/products.service';

@ApiTags('Instances')
@Controller('instances')
export class InstancesController {
  constructor(
    private readonly instancesService: InstancesService,
    private readonly productsService: ProductsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('')
  myInstances(@Request() req) {
    return this.instancesService.instances(req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createInstances(@Request() req) {
    const instanceData: CreateInstance[] = req.body.subscriptions
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
