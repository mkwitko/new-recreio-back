import { Get, Query } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

export class ControlController {
  constructor(protected service: any) {}
  @Get()
  async get(@Query() query) {
    const params: ParamsInterface = {};
    Object.keys(query).forEach((e) => {
      params.where = { ...params.where, [e]: query[e] };
    });
    return await this.service.get(params);
  }
}
