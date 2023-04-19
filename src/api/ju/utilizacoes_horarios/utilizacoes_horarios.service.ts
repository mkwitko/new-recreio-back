import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';
import { UtilizacoesHorariosModelService } from './model/model.service';

@Injectable()
export class UtilizacoeshorariosService {
  constructor(private model: UtilizacoesHorariosModelService) {}

  async get(params: ParamsInterface) {
    const result = await this.model.get(params);

    return result.filter((e) => {
      if (e.VW_UTILIZACOES) return e;
    });
  }
}
