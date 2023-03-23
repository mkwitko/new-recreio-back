import { LocacoesService } from './locacoes.service';
import { LocacoesModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [LocacoesModelService, LocacoesService],
  exports: [LocacoesModelService, LocacoesService],
})
export class LocacoesModule {}
