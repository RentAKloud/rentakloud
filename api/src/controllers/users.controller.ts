import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  users() {
    // TODO should be accessible only to admin/staff
    return this.usersService.users({})
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  user(
    @Param('id', ParseIntPipe) id: number,
    @Query('profile', ParseBoolPipe) profile: boolean
  ) {
    if (profile) {
      return this.usersService.userWithProfile({ id })
    }
    return this.usersService.user({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  createUser(
    @Request() req,
    @Body() data
  ) {
    const currUser = req.user.userId
    return this.usersService.createUser(data)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser({ id })
  }
}
