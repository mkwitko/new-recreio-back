import { ConfigService } from './../../../routes/config/config.service';
import { QueryClass } from 'src/parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';
import { AgeService } from 'src/services/age/age.service';
import { BoletosService } from '../../boletos/boletos.service';
import { HorariosService } from '../../horarios/horarios.service';
import { PrecosService } from '../../precos/precos.service';
import { ServicosService } from '../../servicos/servicos.service';

@Injectable()
export class UtilizacoesModelService extends QueryClass {
  override table = 'vW_UTILIZACOES';
  override numberFields = ['uti_servico', 'uti_vezes', 'uti_perccons'];
  constructor(
    public judb: PrismaServiceJu,
    private config: ConfigService,
    private date: AgeService,
    private boletos: BoletosService,
    private services: ServicosService,
    private horarios: HorariosService,
    private precos: PrecosService,
  ) {
    super(judb);
  }

  override async insert(data, table?) {
    const debts = await this.check_debts(data);
    if (debts.length > 0) {
      return { status: false, data: 'Existem débitos em aberto' };
    }

    const check_spots = await this.check_spots(data);
    if (!check_spots) {
      return { status: false, data: 'Horário indisponível' };
    }

    const isServiceActive = await this.isServiceActive(data);
    if (!isServiceActive) {
      return { status: false, data: 'Serviço não está ativo' };
    }

    const prices = await this.check_prices(data);
    if (prices.length === 0) {
      return { status: false, data: 'Preço não encontrado' };
    }

    // Caso esteja em periodo de renovação, não permite contratar
    // TODO - Verificar se o serviço é renovável
    const renewPeriod = await this.renewPeriod();
    if (renewPeriod) {
      return {
        status: false,
        data: 'Serviço não pode ser contratado neste período',
      };
    }

    if (data.uti_servico == 1484) {
      // TODO inserir preferencias ciclismo
    }

    if (data.uti_logic === 'tenis_m') {
      //TODO Tenis inserir na reserva de serviços
    }

    // Verifica se o serviço já foi contratado pelo usuário
    const hired_services = await this.findService(data);
    if (hired_services.length > 0) {
      return { status: false, data: 'Serviço previamente contratado' };
    }

    // const keys =
    //   Object.keys(data).join(', ') + ', uti_dtlancamento, uti_dtinicial';
    // const values = Object.values(this.filtering({ data }).data).map((e) => {
    //   return e;
    // });
    // values.push(this.date.getDate());
    // values.push(this.date.getDate());
    // const insert = await this.insertRaw(keys, values, table);
    // return insert;
  }

  private async check_prices(data) {
    const prices = await this.precos.get({
      where: {
        pre_idprecos: data.uti_preco_id,
      },
    });
    return prices;
  }

  private async check_spots(data) {
    let spots = await this.horarios.get({
      include: {
        VW_UTILIZACOES_HORARIOS: {
          include: {
            VW_UTILIZACOES: true,
          },
        },
      },
      where: {
        hor_idhorario: {
          in: data.uti_horarios.split(',').map((e) => {
            return +e;
          }),
        },
      },
    });
    spots = spots.map((element) => {
      const spots = element.hor_capacidade;
      const utilizations = element.VW_UTILIZACOES_HORARIOS.filter((e) => {
        return e.VW_UTILIZACOES;
      }).reduce((result, each) => {
        if (!result['utilization'])
          result['utilization'] = each.VW_UTILIZACOES.uti_vezes;
        else result['utilization'] += each.VW_UTILIZACOES.uti_vezes;
        return result;
      });
      if (utilizations['utilization'] >= spots) return false;
      else return true;
    });

    if (spots.includes(false)) return false;
    return true;
  }

  private async isServiceActive(data) {
    const service_active = await this.services.get({
      select: {
        ser_ativo: true,
        ser_permitecontratacao: true,
      },
      where: {
        ser_servico: data.uti_servico,
      },
    });
    return (
      service_active[0].ser_ativo && service_active[0].ser_permitecontratacao
    );
  }

  private async findService(data) {
    const hired_services = await this.get({
      where: {
        uti_associado: data.uti_associado,
        uti_sequencia: data.uti_sequencia,
        uti_servico: data.uti_servico,
      },
    });
    return hired_services;
  }

  private async renewPeriod() {
    const config = await this.config.get({});
    const renew_service_start = this.date.getDate(
      config[0].renew_service_start,
    );
    const renew_service_end = this.date.getDate(config[0].renew_service_end);
    const today = this.date.getDate();
    if (today > renew_service_start && today < renew_service_end) {
      return true;
    } else {
      return false;
    }
  }

  private async check_debts(data) {
    const today = new Date();
    const debts = await this.boletos.get({
      where: {
        ass_associado: data.uti_associado,
        deb_dtvencimento: {
          lt: new Date(new Date().setDate(today.getDate() - 30)),
        },
      },
    });
    return debts;
  }
}
