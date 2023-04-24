import { QueryClass } from 'src/parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';

@Injectable()
export class BoletosModelService extends QueryClass {
  override table = 'vW_BOLETOS';
  override numberFields = [
    'ass_associado',
    'ser_servico',
    'deb_vlrparcela',
    'deb_vlrdesconstos',
    'par_percjurosdiarios',
    'par_percmulta',
    'par_diasmulta',
    'par_vljuros',
    'par_vlmulta',
    'bar_codcontr',
    'deb_seqrem',
  ];
  constructor(public judb: PrismaServiceJu) {
    super(judb);
  }
}
