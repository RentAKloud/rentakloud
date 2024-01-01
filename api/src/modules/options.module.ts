import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { OptionsController } from 'src/controllers/options.controller';
import { OptionsService } from 'src/services/options.service';

@Module({
  imports: [PrismaModule],
  controllers: [OptionsController],
  providers: [OptionsService],
  exports: [OptionsService]
})
export class OptionsModule { }
