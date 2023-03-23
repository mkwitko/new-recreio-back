import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { UtilizacoesService } from './utilizacoes.service';
import { UtilizacoesModelService } from './model/model.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [UtilizacoesService, UtilizacoesModelService],
  exports: [UtilizacoesService, UtilizacoesModelService],
})
export class UtilizacoesModule {}
