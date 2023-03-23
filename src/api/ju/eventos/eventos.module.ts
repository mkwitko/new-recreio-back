import { EventosService } from './eventos.service';
import { EventosModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [EventosModelService, EventosService],
  exports: [EventosModelService, EventosService],
})
export class EventosModule {}
