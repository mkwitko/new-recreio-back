import { UtilizacoesModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class UtilizacoesService {
  constructor(private model: UtilizacoesModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
