import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { QueryClass } from 'src/parents/query/query';

@Injectable()
export class ClassificationFilterModel extends QueryClass {
  override table = 'app_service_category_filter';
  constructor(protected db: PrismaService) {
    super(db);
  }
}
