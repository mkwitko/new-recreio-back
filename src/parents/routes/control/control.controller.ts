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
    if (this.include().include) params.include = this.include().include;

    const result = await this.service.get(params);
    return {
      status: Array.isArray(result)
        ? result.length > 0
        : Object.keys(result).length > 0,
      data: result,
    };
  }

  include(): any {
    return [];
  }

  reqQuery(query) {
    let params: any = {};
    Object.keys(query).forEach((e) => {
      params = { ...params, [e]: query[e] };
    });
    return params;
  }

  reqBody(req) {
    let params: any = {};
    Object.keys(req.body).forEach((e) => {
      params = { ...params, [e]: req.body[e] };
    });
    return params;
  }
}
