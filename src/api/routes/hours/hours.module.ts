import { HoursModel } from './model/model.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { HoursController } from './hours.controller';
import { HoursService } from './hours.service';

@Module({
  imports: [PrismaModule],
  controllers: [HoursController],
  providers: [HoursService, HoursModel],
  exports: [HoursModel, HoursService],
})
export class HoursModule {}
