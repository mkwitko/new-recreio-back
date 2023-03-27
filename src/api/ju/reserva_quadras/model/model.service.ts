import { QueryClass } from 'src/parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';

@Injectable()
export class ReservaQuadrasModelService extends QueryClass {
  override table = 'vW_RESERVAS_QUADRAS';
  constructor(public judb: PrismaServiceJu) {
    super(judb);
  }
}
