import { PrecosModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class PrecosService {
  constructor(private model: PrecosModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
