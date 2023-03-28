import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class ServService {
  constructor(public model: any) {}
  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }
}
