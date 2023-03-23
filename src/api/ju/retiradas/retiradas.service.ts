import { RetiradasModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class RetiradasService {
  constructor(private model: RetiradasModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
