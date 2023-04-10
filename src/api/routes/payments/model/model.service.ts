import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { QueryClass } from 'src/parents/query/query';

@Injectable()
export class PaymentModel extends QueryClass {
  constructor(protected db: PrismaService) {
    super(db);
  }
}
