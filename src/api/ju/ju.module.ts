import { Module } from '@nestjs/common';
import { AssociadosModule } from './associados_ativos/associados.module';
import { BoletosModule } from './boletos/boletos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ClassificacoesModule } from './classificacoes/classificacoes.module';
import { EventosModule } from './eventos/eventos.module';
import { ExtratoModule } from './extrato/extrato.module';
import { FinalidadesModule } from './finalidades/finalidades.module';
import { HorariosModule } from './horarios/horarios.module';
import { LocacoesModule } from './locacoes/locacoes.module';
import { LocaisModule } from './locais/locais.module';
import { PrecosModule } from './precos/precos.module';
import { PreferenciasModule } from './preferencias/preferencias.module';
import { ReservaQuadrasModule } from './reserva_quadras/reserva_quadras.module';
import { ReservaServicosModule } from './reserva_servicos/reserva_servicos.module';
import { RetiradasModule } from './retiradas/retiradas.module';
import { ServicosModule } from './servicos/servicos.module';
import { UtilizacoesModule } from './utilizacoes/utilizacoes.module';
import { VacinacaoModule } from './vacinacao/vacinacao.module';
import { UtilizacoesHorariosModule } from './utilizacoes_horarios/utilizacoes_horarios.module';

@Module({
  imports: [
    AssociadosModule,
    BoletosModule,
    CategoriasModule,
    ClassificacoesModule,
    EventosModule,
    ExtratoModule,
    FinalidadesModule,
    HorariosModule,
    LocacoesModule,
    LocaisModule,
    PrecosModule,
    PreferenciasModule,
    ReservaQuadrasModule,
    ReservaServicosModule,
    RetiradasModule,
    ServicosModule,
    UtilizacoesModule,
    VacinacaoModule,
    UtilizacoesHorariosModule,
  ],
})
export class JuModule {}
