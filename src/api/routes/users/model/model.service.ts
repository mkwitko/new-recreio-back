import { PrismaService } from './../../../../../database_core/prisma.service';
import { Injectable } from '@nestjs/common';
import { QueryClass } from 'src/parents/query/query';

@Injectable()
export class UsersModel extends QueryClass {
  override table = 'app_user';
  override stringifyFields = ['id', 'sequency'];
  override zeroInFrontFields = ['sequency'];
  constructor(public db: PrismaService) {
    super(db);
  }
}
