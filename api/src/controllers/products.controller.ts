import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ProductsService } from '../services/products.service';
import * as edjsHTML from "editorjs-html";

type CreateProduct = Product & { categories: number[] }
type UpdateProduct = CreateProduct & { oldCategories: number[] }

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

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
    return this.productsService.activeProducts(req.user.userId)
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
    const toRemove = oldCategories.filter(x => !categories.includes(x))
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
    return this.productsService.createUserProducts(subscriptions, req.user.userId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me/:id')
  deleteUserProduct(@Param('id') id: string) {
    return this.productsService.deleteUserProduct(id)
  }
}
