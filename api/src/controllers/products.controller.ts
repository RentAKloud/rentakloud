import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product, UserToProducts } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ProductsService } from '../services/products.service';
import * as edjsHTML from "editorjs-html";
import { InstancesService } from '../services/instances.service';

type CreateProduct = Product & { categories: number[] }
type UpdateProduct = CreateProduct & { oldCategories: number[] }

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly instancesService: InstancesService
    ) { }

  @Get()
  products(
    @Query('productType') productType
  ) {
    return this.productsService.products({
      where: {
        productType
      }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  myProducts(@Request() req) {
    return this.instancesService.userProducts(req.user.userId)
  }

  @Get('/:id')
  product(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.product({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() reqBody: CreateProduct) {
    const { categories } = reqBody

    if (reqBody.descriptionEditor) {
      //@ts-ignore
      const parser = edjsHTML()
      reqBody.description = parser.parse(reqBody.descriptionEditor).join("")
    }

    return this.productsService.createProduct({
      ...reqBody,
      categories: {
        connect: categories.map(id => ({ id })),
        // disconnect: toRemove.map(id => ({ id }))
      }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateProduct(@Body() reqBody: UpdateProduct) {
    const { categories, oldCategories } = reqBody
    const toRemove = oldCategories?.filter(x => !categories.includes(x)) || []
    delete reqBody['oldCategories']

    if (reqBody.descriptionEditor) {
      //@ts-ignore
      const parser = edjsHTML()
      reqBody.description = parser.parse(reqBody.descriptionEditor).join("")
    }

    return this.productsService.updateProduct({
      where: { id: reqBody.id },
      data: {
        ...reqBody,
        categories: {
          connect: categories.map(id => ({ id })),
          disconnect: toRemove.map(id => ({ id }))
        }
      }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    // TODO delete all active products
    return this.productsService.deleteProduct({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Post('/me')
  createUserProducts(@Request() req) {
    const { subscriptions } = req.body
    return this.instancesService.createUserProducts(subscriptions, req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me/:id')
  userProduct(
    @Param('id') id: string,
    @Request() req
  ) {
    return this.instancesService.userProduct(id, req.user.userId)
  }

  @Patch('/me/:id')
  updateUserProduct(@Param('id') id: string, @Body() reqBody: UserToProducts) {
    return this.instancesService.updateUserProduct({
      where: {
        id
      }, data: {
        ...reqBody
      }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me/:id')
  deleteUserProduct(@Param('id') id: string) {
    return this.instancesService.deleteUserProduct(id)
  }
}
