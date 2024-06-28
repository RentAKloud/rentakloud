import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Redirect, Request, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { InstancesService } from '../services/instances.service';
import { CreateInstance, InstanceCallback, InstancesFindManyQuery, InstancesQuery, Plan } from '../types/instances.dto';
import { ProductsService } from '../services/products.service';
import { Instance, Prisma } from '@prisma/client';

@ApiTags('Instances')
@Controller('instances')
export class InstancesController {
  constructor(
    private readonly instancesService: InstancesService,
    private readonly productsService: ProductsService
  ) { }

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
  myInstances(
    @Request() req,
    @Query() { sortBy, page, pageSize, q }: InstancesQuery
  ) {
    const filters: Prisma.InstanceWhereInput = {
      userId: req.user.userId
    }

    if (q) {
      filters.AND = {
        ...filters.AND,
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
        ]
      }
    }
  
    const query: InstancesFindManyQuery = {
      where: filters
    }

    if (sortBy) {
      query.orderBy = {[sortBy]: "asc"}
    }

    return this.instancesService.instances(query)
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

  @UseGuards(JwtAuthGuard)
  @Post('/setup-vnc-tunnel')
  setupVNCTunnel(@Body() body) {
    const { vmId } = body
    return this.instancesService.initIPSecTunnel(vmId)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/action')
  action(
    @Param('id') id: string,
    @Body() body
  ) {
    const { action, params } = body

    return this.instancesService.action(id, action)
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
