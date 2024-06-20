import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ConfigsService } from 'src/services/configs.service';

@ApiTags('Configs')
@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) { }

  @Get()
  configs(@Request() req) {
    return this.configsService.configs({})
  }

  @Get('/:id')
  config(@Param('id', ParseIntPipe) id: number) {
    return this.configsService.config({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createCategory(@Body() reqBody) {
    return this.configsService.createConfig(reqBody)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateCategory(@Body() reqBody) {
    return this.configsService.updateConfig(reqBody)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.configsService.deleteConfig({ id })
  }
}
