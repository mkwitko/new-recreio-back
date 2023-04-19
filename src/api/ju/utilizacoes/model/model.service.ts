import { QueryClass } from 'src/parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';
import { AgeService } from 'src/services/age/age.service';

@Injectable()
export class UtilizacoesModelService extends QueryClass {
  override table = 'vW_UTILIZACOES';
  override numberFields = [
    'uti_associado',
    'uti_sequencia',
    'uti_servico',
    'uti_vezes',
    'uti_perccons',
  ];
  constructor(public judb: PrismaServiceJu, private date: AgeService) {
    super(judb);
  }

  override async insert(data, table?) {
    const keys = Object.keys(data).join(', ');
    const values = Object.values(data);
    return await this.judb.$executeRawUnsafe(`
       INSERT INTO ${
         table ? table : this.table
       } (${keys}, uti_dtlancamento, uti_dtinicial)
       VALUES (${values[0]}, ${values[1]}, ${values[2]}, ${values[3]}, '${
      values[4]
    }', '${values[5]}', '${values[6]}', ${
      values[7]
    }, '${this.date.getDate()}', '${this.date.getDate()}')`);
  }
}
