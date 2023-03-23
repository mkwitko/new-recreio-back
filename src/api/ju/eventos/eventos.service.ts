import { EventosModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class EventosService {
  constructor(private model: EventosModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
