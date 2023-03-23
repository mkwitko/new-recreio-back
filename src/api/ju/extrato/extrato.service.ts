import { ExtratoModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class ExtratoService {
  constructor(private model: ExtratoModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
