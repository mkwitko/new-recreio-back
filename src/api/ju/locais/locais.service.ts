import { LocaisModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class LocaisService {
  constructor(private model: LocaisModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
