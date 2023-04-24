import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';
import { UtilizacoesHorariosModelService } from './model/model.service';
import { ServService } from 'src/parents/routes/serv/serv.service';

@Injectable()
export class UtilizacoeshorariosService extends ServService {
  constructor(model: UtilizacoesHorariosModelService) {
    super(model);
  }

  override async get(params: ParamsInterface) {
    const result = await this.model.get(params);

    return result.filter((e) => {
      if (e.VW_UTILIZACOES) return e;
    });
  }
}
