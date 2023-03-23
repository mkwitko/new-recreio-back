import { ClassificacoesService } from './classificacoes.service';
import { ClassificacoesModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [ClassificacoesModelService, ClassificacoesService],
  exports: [ClassificacoesModelService, ClassificacoesService],
})
export class ClassificacoesModule {}
