import { HorariosModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class HorariosService {
  constructor(private model: HorariosModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
