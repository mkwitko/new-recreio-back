import { QueryClass } from 'src/parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class ReservaQuadrasModelService extends QueryClass {
  constructor(public db: PrismaService, public judb: PrismaServiceJu) {
    super();
  }

  async get(params: ParamsInterface) {
    this.filtering(params);
    return await this.judb.vW_RESERVAS_QUADRAS.findMany(this.filter);
  }
}
