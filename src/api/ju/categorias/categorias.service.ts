import { CategoriasModelService } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class CategoriasService {
  constructor(private model: CategoriasModelService) {}

  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
