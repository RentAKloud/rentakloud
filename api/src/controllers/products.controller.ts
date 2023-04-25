import { Controller, Get, Param, ParseIntPipe, Request } from '@nestjs/common';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  products(@Request() req) {
    return this.productsService.products({})
  }

  @Get('/:id')
  product(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.product({ id })
  }
}
