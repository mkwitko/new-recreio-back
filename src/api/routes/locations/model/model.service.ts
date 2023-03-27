import { QueryClass } from './../../../../parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { SlugifyService } from 'src/services/slugify/slugify.service';

@Injectable()
export class LocationModel extends QueryClass {
  constructor(public db: PrismaService, private slugify: SlugifyService) {
    super(db);
  }

  async insert_cron(data) {
    const order_by = (await this.db.site_place.count()) + 1;
    await this.db.site_place.create({
      data: {
        id: data.loc_local,
        type: 'place',
        id_type: 1,
        order_by,
      },
    });
    await this.db.site_place_description.create({
      data: {
        id_place: data.loc_local,
        title: data.loc_descricao,
        slug: this.slugify.slugify(data.loc_descricao),
      },
    });
    return await this.db.site_place_ju.create({
      data,
    });
  }
}
