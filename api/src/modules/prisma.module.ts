import { Module } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }
