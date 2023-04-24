import { Get, Post, Query, Request } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

export class ControlController {
  constructor(protected service: any) {}

  @Get()
  async get(@Query() query) {
    const params: ParamsInterface = {};
    Object.keys(query).forEach((e) => {
      const queryParam = query[e].includes(',')
        ? query[e].split(',').map((e) => e.trim())
        : query[e];
      if (Array.isArray(queryParam)) {
        params.where = {
          [e]: {
            in: queryParam,
          },
        };
      } else {
        params.where = { ...params.where, [e]: query[e] };
      }
    });

    params.where = { ...params.where, ...this.where() };
    if (this.include().include) params.include = this.include().include;

    if (Object.entries(this.select()).length > 0) params.select = this.select();

    const result = await this.service.get(params);
    return {
      status: Array.isArray(result)
        ? result.length > 0
        : Object.keys(result).length > 0,
      data: result,
    };
  }

  @Post()
  async post(@Request() req) {
    return await this.service.create(this.reqBody(req));
  }

  select(): any {
    return {};
  }

  where(): any {
    return [];
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
