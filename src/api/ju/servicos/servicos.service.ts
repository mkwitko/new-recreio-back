import { ServicosModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class ServicosService {
  constructor(private model: ServicosModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
