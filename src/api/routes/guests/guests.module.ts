import { GuestsModel } from './model/model.service';
import { GuestsService } from './guests.service';
import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GuestsController],
  providers: [GuestsService, GuestsModel],
  exports: [GuestsService, GuestsModel],
})
export class GuestsModule {}
