import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { UtilizacoesService } from './utilizacoes.service';
import { UtilizacoesModelService } from './model/model.service';
import { Module } from '@nestjs/common';
import { UtilizacoesController } from './utilizacoes.controller';
import { AgeModule } from 'src/services/age/age.module';
import { ConfigModule } from 'src/api/routes/config/config.module';
import { BoletosModule } from '../boletos/boletos.module';
import { HorariosModule } from '../horarios/horarios.module';
import { PrecosModule } from '../precos/precos.module';
import { ServicosModule } from '../servicos/servicos.module';

@Module({
  imports: [
    PrismaModule,
    AlsModule,
    AgeModule,
    ConfigModule,
    BoletosModule,
    HorariosModule,
    PrecosModule,
    ServicosModule,
  ],
  controllers: [UtilizacoesController],
  providers: [UtilizacoesService, UtilizacoesModelService],
  exports: [UtilizacoesService, UtilizacoesModelService],
})
export class UtilizacoesModule {}
