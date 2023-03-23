import { ReservaServicosModelService } from './model/model.service';
import { ReservaServicosService } from './reserva_servicos.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [ReservaServicosService, ReservaServicosModelService],
  exports: [ReservaServicosService, ReservaServicosModelService],
})
export class ReservaServicosModule {}
