import { Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProductsService } from 'src/services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  products(@Request() req) {
    return this.productsService.products({})
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
