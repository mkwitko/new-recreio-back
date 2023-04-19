import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UtilizacoesHorariosController } from './utilizacoes_horarios.controller';
import { UtilizacoeshorariosService } from './utilizacoes_horarios.service';
import { UtilizacoesHorariosModelService } from './model/model.service';

@Module({
  imports: [PrismaModule, AlsModule],
  controllers: [UtilizacoesHorariosController],
  providers: [UtilizacoeshorariosService, UtilizacoesHorariosModelService],
  exports: [UtilizacoeshorariosService, UtilizacoesHorariosModelService],
})
export class UtilizacoesHorariosModule {}
