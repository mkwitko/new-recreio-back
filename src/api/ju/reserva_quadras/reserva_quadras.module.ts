import { ReservaQuadrasModelService } from './model/model.service';
import { ReservaQuadrasService } from './reserva_quadras.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [ReservaQuadrasService, ReservaQuadrasModelService],
  exports: [ReservaQuadrasService, ReservaQuadrasModelService],
})
export class ReservaQuadrasModule {}
