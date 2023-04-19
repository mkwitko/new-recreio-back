import { QueryClass } from 'src/parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';

@Injectable()
export class UtilizacoesHorariosModelService extends QueryClass {
  override table = 'vW_UTILIZACOES_HORARIOS';
  override numberFields = ['uth_idhorario'];
  override arrayNumberfy = true;
  constructor(public judb: PrismaServiceJu) {
    super(judb);
  }
}
