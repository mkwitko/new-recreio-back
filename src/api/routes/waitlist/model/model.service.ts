import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database_core/prisma.service';
import { QueryClass } from 'src/parents/query/query';
import { ParamsInterface } from '../../../../interfaces/params.interface';

@Injectable()
export class WaitlistModel extends QueryClass {
  constructor(protected db: PrismaService) {
    super(db);
  }

  override async get(params: ParamsInterface) {
    // // Default Filtering
    // this.filtering(params);
    // // Find
    // const data = await this.db.app_service_waitlist.findMany(this.filter);
    // // Retrieve service ids
    // const services = (await data).map((item) => {
    //   return item.ju_servico_id;
    // });
    // // Retrieve service names
    // const services_name = await this.service.get({
    //   select: {
    //     ser_servico: true,
    //     ser_descricao: true,
    //   },
    //   ju_servico_id: services,
    // });
    // // Add service names to data
    // data.forEach((e: any, i) => {
    //   if (services_name.length > 1) {
    //     services_name.forEach((name) => {
    //       if (e.ju_servico_id === name.ser_servico) {
    //         return (e.ju_servico_nome = name.ser_descricao);
    //       }
    //     });
    //   } else {
    //     return (e.ju_servico_nome = services_name[0].ser_descricao);
    //   }
    // });
    // return {
    //   status: data.length > 0,
    //   data: data,
    // };
  }

  protected override limit(params) {
    if (!params.new_ordering) {
      if (params.limit) {
        this.filter.take = params.limit;
      }

      if (params.offset) {
        this.filter.skip = params.offset;
      }
    }
  }
}
