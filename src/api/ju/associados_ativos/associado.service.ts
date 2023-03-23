import { AssociadosModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class AssociadosService {
  constructor(private model: AssociadosModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
