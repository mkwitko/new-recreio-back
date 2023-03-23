import { ReservaQuadrasModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class ReservaQuadrasService {
  constructor(private model: ReservaQuadrasModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
