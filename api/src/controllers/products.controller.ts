import { Controller, Get, Param, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProductsService } from 'src/services/products.service';

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
}
