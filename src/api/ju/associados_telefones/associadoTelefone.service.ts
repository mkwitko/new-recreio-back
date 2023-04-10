import { AssociadosTelefoneModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class AssociadosTelefoneService {
  constructor(private model: AssociadosTelefoneModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
