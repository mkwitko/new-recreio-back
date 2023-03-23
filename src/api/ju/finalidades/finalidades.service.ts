import { FinalidadesModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class FinalidadesService {
  constructor(private model: FinalidadesModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
