import { LocationModel } from './../../model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class KiosksService {
  constructor(private model: LocationModel) {}

  // TODO aplicar busca por conteudo da página

  async call(id?: string): Promise<ParamsInterface> {
    // Informações do usuário salvas na sessão
    const fields = await this.get_params(id ? id : null);
    return fields;
  }

  private get_params(id) {
    const where = {
      status_app: true,
      id_type: 1,
      site_place_ju: {
        status: 1,
      },
    };
    const include = {
      include: {
        site_place_discount: true,
        site_place_gallery: true,
        site_place_goal: true,
        site_place_ju: true,
        site_place_description: true,
      },
    };
    const params: any = { where: { ...where } };

    if (id) {
      params.where = { ...params.where, id: id };
    }
    params.include = include.include;

    return params;
  }

  async sync() {
    const kiosks_ju = await this.model.get_ju({
      select: {
        loc_local: true,
        loc_descricao: true,
        loc_vlraluguel: true,
        loc_idadeinicial: true,
        loc_idadefinal: true,
      },
      where: {
        loc_locavel: 'S',
        loc_servico: 1216,
      },
    });
    kiosks_ju.map(async (e) => {
      const kioks_ezoom: any = await this.model.get({
        where: {
          id: e.loc_local,
        },
        include: {
          site_place_ju: true,
        },
      });

      // Caso exista no banco de dados da tabela principal
      if (kioks_ezoom[0]) {
        // Confere se não existia na tabela de cron e insere
        if (!kioks_ezoom[0].site_place_ju) {
          this.model.insert_cron({
            id: +e.loc_local,
            loc_vlraluguel: +e.loc_vlraluguel,
            loc_idadeinicial: e.loc_idadeinicial ? +e.loc_idadeinicial : null,
            loc_idadefinal: e.loc_idadefinal ? +e.loc_idadefinal : null,
          });
        }
        // Caso exista na tabela de cron
        else {
          const from_db: any = await this.model.get({
            id: kioks_ezoom[0].site_place_ju.id,
            include: {
              site_place_ju: true,
            },
          });
          const { status, ...compare_ezoom } = from_db[0].site_place_ju;
          const compare_ju = {
            id: +e.loc_local,
            loc_idadeinicial: e.loc_idadeinicial ? +e.loc_idadeinicial : null,
            loc_idadefinal: e.loc_idadefinal ? +e.loc_idadefinal : null,
            loc_vlraluguel: +e.loc_vlraluguel,
          };

          // Compara o registro atual com o que veio do banco
          // Caso necessário, atualiza
          if (JSON.stringify(compare_ezoom) !== JSON.stringify(compare_ju)) {
            this.model.update_cron(e.loc_local, {
              id: +e.loc_local,
              loc_vlraluguel: +e.loc_vlraluguel,
              loc_idadeinicial: e.loc_idadeinicial ? +e.loc_idadeinicial : null,
              loc_idadefinal: e.loc_idadefinal ? +e.loc_idadefinal : null,
              status: 1,
            });
          }
          // Caso esteja igual, confere se está desabilitado
          // Pois, na query acima trouxe os habilitados
          else {
            if (status == 0) {
              this.model.update_cron(e.loc_local, {
                status: 1,
              });
            }
          }
        }
      }
    });
    // Encontra os salões desabilitados
    const disabled_kiosks_ju = await this.model.get_ju({
      select: {
        loc_local: true,
      },
      where: {
        loc_locavel: 'N',
        loc_servico: 1216,
      },
    });
    disabled_kiosks_ju.map(async (e) => {
      // Confere se tem registro de cron
      const kioks_ezoom: any = await this.model.get({
        where: {
          id: e.loc_local,
        },
        include: {
          site_place_ju: true,
        },
      });

      // Se tiver, desabilita
      if (kioks_ezoom[0].site_place_ju) {
        this.model.update_cron(e.loc_local, {
          status: 0,
        });
      }
    });
  }
}
