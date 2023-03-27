import { ClassificationModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class ClassificationService {
  constructor(private model: ClassificationModel) {}
  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
