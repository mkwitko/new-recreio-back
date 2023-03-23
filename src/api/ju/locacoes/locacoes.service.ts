import { LocacoesModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class LocacoesService {
  constructor(private model: LocacoesModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
