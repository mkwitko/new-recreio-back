import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { QueryClass } from 'src/parents/query/query';

@Injectable()
export class ClassificationModel extends QueryClass {
  override table = 'app_service_category';
  constructor(protected db: PrismaService) {
    super(db);
  }
}
