import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { OptionsService } from '../services/options.service';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  options() {
    return this.optionsService.options({})
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/:key')
  option(@Param('key') key: string) {
    return this.optionsService.option({ key })
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  createOption(
    @Request() req,
    @Body() data
  ) {
    const currUser = req.user.userId
    return this.optionsService.createOption(data)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:key')
  updateOption(@Param('key') key: string, @Body() data) {
    return this.optionsService.updateOption({
      where: { key },
      data: { value: data }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:key')
  deleteOption(@Param('key') key: string) {
    return this.optionsService.deleteOption({ key })
  }
}
