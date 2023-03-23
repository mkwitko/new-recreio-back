import { ServicesModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class ServicesService {
  constructor(private model: ServicesModel) {}
  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }

  async get_ju(params: ParamsInterface) {
    return await this.model.get_ju(params);
  }
}
