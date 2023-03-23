import { VacinacaoModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class VacinacaoService {
  constructor(private model: VacinacaoModelService) {}
  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
