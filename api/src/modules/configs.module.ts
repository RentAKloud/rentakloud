import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { ConfigsService } from 'src/services/configs.service';
import { ConfigsController } from 'src/controllers/configs.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ConfigsController],
  providers: [ConfigsService],
  exports: [ConfigsService]
})
export class ConfigsModule { }
