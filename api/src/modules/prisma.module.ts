import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }
