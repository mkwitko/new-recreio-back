import { QueryClass } from 'src/parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';

@Injectable()
export class RetiradasModelService extends QueryClass {
  override table = 'vW_RETIRADAS';
  constructor(public judb: PrismaServiceJu) {
    super(judb);
  }
}
