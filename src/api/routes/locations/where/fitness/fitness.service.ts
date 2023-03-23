import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class FitnessService {
  async call(id?: string): Promise<ParamsInterface> {
    const fields = this.get_params(id ? id : null);
    return fields;
  }

  // TODO adicionar os já contratados
  async get_params(id?: string) {
    const where = {
      type: 'gym',
      status_app: true,
    };

    const params: any = { where: { ...where } };

    const include = {
      include: {
        site_place_gallery: true,
        site_place_description: true,
      },
    };

    if (id) {
      params.where = { ...params.where, loc_local: id };
    }

    params.include = include.include;
    return params;
  }
}
