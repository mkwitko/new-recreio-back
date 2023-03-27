import { QueryClass } from 'src/parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';

@Injectable()
export class CategoriasModelService extends QueryClass {
  override table = 'vW_CATEGORIAS';
  constructor(public db: PrismaService, public judb: PrismaServiceJu) {
    super(judb);
  }
}
