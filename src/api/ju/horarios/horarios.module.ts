import { HorariosService } from './horarios.service';
import { HorariosModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [HorariosModelService, HorariosService],
  exports: [HorariosModelService, HorariosService],
})
export class HorariosModule {}
