import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { QueryClass } from 'src/parents/query/query';

@Injectable()
export class PricesModel extends QueryClass {
  override table = 'app_prices_ju';
  constructor(protected db: PrismaService) {
    super(db);
  }
}
