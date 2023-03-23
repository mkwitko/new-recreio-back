import { QueryClass } from './../../../../parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaServiceJu } from 'database_core/prisma.service_ju';
import { ParamsInterface } from 'src/interfaces/params.interface';
import { PrismaService } from 'database_core/prisma.service';

@Injectable()
export class LocationModel extends QueryClass {
  constructor(public db: PrismaService, public judb: PrismaServiceJu) {
    super();
  }

  async get(params: ParamsInterface) {
    this.filtering(params);
    return await this.db.site_place.findMany(this.filter);
  }

  async get_ju(params: ParamsInterface) {
    this.filtering(params);
    return await this.judb.vW_LOCAIS.findMany(this.filter);
  }

  async insert(data) {
    return await this.db.site_place.create({
      data,
    });
  }

  async update(id, data) {
    return await this.db.site_place.update({
      where: {
        id,
      },
      data,
    });
  }

  async insert_cron(data) {
    return await this.db.site_place_ju.create({
      data,
    });
  }

  async update_cron(id, data) {
    return await this.db.site_place_ju.update({
      where: {
        id,
      },
      data,
    });
  }
}
