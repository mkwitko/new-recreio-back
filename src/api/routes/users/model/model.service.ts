import { PrismaService } from './../../../../../database_core/prisma.service';
import { ParamsInterface } from './../../../../interfaces/params.interface';
import { Injectable } from '@nestjs/common';
import { QueryClass } from 'src/parents/query/query';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';

@Injectable()
export class UsersModel extends QueryClass {
  constructor(public db: PrismaService, public judb: PrismaServiceJu) {
    super();
  }

  async get(params: ParamsInterface) {
    this.filtering(params);
    return await this.db.app_user.findMany(this.filter);
  }

  async insert(data) {
    const user = await this.db.app_user.create({
      data,
    });
    return user;
  }

  async update(params: ParamsInterface, data) {
    this.filtering(params);
    const user = await this.db.app_user.update({
      where: params.where,
      data,
    });
    return user;
  }

  async get_ju(params: ParamsInterface) {
    this.filtering(params);
    return await this.judb.vW_ASSOCIADOS_ATIVOS.findMany(this.filter);
  }

  async get_ju_telefone(params: ParamsInterface) {
    this.filtering(params);

    const users = await this.judb.vW_ASSOCIADOS_TELEFONES.findMany(this.filter);
    return users;
  }
}
