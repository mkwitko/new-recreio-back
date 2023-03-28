import { QueryClass } from './../../../../parents/query/query';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { SlugifyService } from 'src/services/slugify/slugify.service';

@Injectable()
export class LocationModel extends QueryClass {
  override numberFields = ['id'];
  override table = 'site_place';
  constructor(public db: PrismaService, private slugify: SlugifyService) {
    super(db);
  }

  async insert_cron(data, table, custom) {
    const order_by = (await this.db.site_place.count()) + 1;
    await this.insert_main(data, order_by, custom);
    await this.insert_description(data);
    return await this.db.site_place_ju.create({
      data,
    });
  }

  async insert_main(data, order_by, type) {
    const site_place_exist = await this.db.site_place.findFirst({
      where: {
        id: data.loc_local,
      },
    });
    if (!site_place_exist) {
      await this.db.site_place.create({
        data: {
          id: data.loc_local,
          type,
          id_type: 1,
          order_by,
        },
      });
    }
  }

  async insert_description(data) {
    const site_place_exist_description =
      await this.db.site_place_description.findFirst({
        where: {
          id_place: data.loc_local,
        },
      });
    if (!site_place_exist_description) {
      await this.db.site_place_description.create({
        data: {
          id_place: data.loc_local,
          title: data.loc_descricao,
          slug: this.slugify.slugify(data.loc_descricao),
        },
      });
    }
  }
}
