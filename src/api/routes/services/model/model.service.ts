import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';
import { QueryClass } from 'src/parents/query/query';

@Injectable()
export class ServicesModel extends QueryClass {
  constructor(protected db: PrismaService, protected judb: PrismaServiceJu) {
    super();
  }
  async get(params) {
    this.filtering(params);
    return await this.db.app_service_category.findMany(this.filter);
  }
  async get_ju(params) {
    this.filter = this.filtering(params);
    if (params.ju_servico_id) {
      this.filter.where = {
        ...this.filter.where,
        ser_servico: {
          in: params.ju_servico_id,
        },
      };
    }
    return await this.judb.vW_SERVICOS.findMany(this.filter);
  }
}
