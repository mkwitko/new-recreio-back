import { AlsModule } from './../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { VacinacaoModelService } from './model/model.service';
import { Module } from '@nestjs/common';
import { VacinacaoService } from './vacinacao.service';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [VacinacaoService, VacinacaoModelService],
  exports: [VacinacaoService, VacinacaoModelService],
})
export class VacinacaoModule {}
