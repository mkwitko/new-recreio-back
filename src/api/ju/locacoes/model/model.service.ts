import { QueryClass } from 'src/parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';

@Injectable()
export class LocacoesModelService extends QueryClass {
  override table = 'vW_LOCACOES';
  constructor(public judb: PrismaServiceJu) {
    super(judb);
  }
}
