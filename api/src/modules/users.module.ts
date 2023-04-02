import { Module } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
