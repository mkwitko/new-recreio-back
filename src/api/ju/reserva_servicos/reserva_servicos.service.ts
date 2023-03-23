import { ReservaServicosModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class ReservaServicosService {
  constructor(private model: ReservaServicosModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
