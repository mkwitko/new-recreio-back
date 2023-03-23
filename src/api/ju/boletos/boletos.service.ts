import { BoletosModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class BoletosService {
  constructor(private model: BoletosModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
