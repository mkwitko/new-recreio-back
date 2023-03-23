import { ClassificacoesModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class ClassificacoesService {
  constructor(private model: ClassificacoesModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
