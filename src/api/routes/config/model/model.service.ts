import { PrismaService } from '../../../../../database_core/prisma.service';
import { Injectable } from '@nestjs/common';
import { QueryClass } from 'src/parents/query/query';

@Injectable()
export class ConfigModel extends QueryClass {
  override table = 'app_config';
  constructor(public db: PrismaService) {
    super(db);
  }
}
