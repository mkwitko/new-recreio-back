import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { QueryClass } from 'src/parents/query/query';

@Injectable()
export class ServicesModel extends QueryClass {
  override table = 'app_services_ju';
  constructor(protected db: PrismaService) {
    super(db);
  }
}
