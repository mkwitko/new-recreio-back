import { PreferenciasModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class PreferenciasService {
  constructor(private model: PreferenciasModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
