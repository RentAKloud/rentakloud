import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CategoriesService } from 'src/services/categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  categories(@Request() req) {
    return this.categoriesService.categories({})
  }

  @Get('/:id')
  category(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.category({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createCategory(@Body() reqBody) {
    return this.categoriesService.createCategory(reqBody)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateCategory(@Body() reqBody) {
    return this.categoriesService.updateCategory(reqBody)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    // TODO delete all active categories
    return this.categoriesService.deleteCategory({ id })
  }
}
