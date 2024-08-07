import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { StatsService } from 'src/services/stats.service';
import { StatsController } from 'src/controllers/stats.controller';
import { UsersModule } from './users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService]
})
export class StatsModule { }
