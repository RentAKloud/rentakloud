import { Module } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { PrismaModule } from './prisma.module';
import { UsersController } from 'src/controllers/users.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
