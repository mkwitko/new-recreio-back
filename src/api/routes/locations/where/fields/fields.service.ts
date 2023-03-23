import { ParamsInterface } from './../../../../../interfaces/params.interface';
import { Injectable } from '@nestjs/common';
import { LocationModel } from '../../model/model.service';

@Injectable()
export class FieldsService {
  constructor(private model: LocationModel) {}

  async call(id?: string): Promise<ParamsInterface> {
    const fields = this.get_params(id ? id : null);
    return fields;
  }

  async get_params(id?: string) {
    // Filtro de campos
    // DB Ju
    const where = {
      loc_locavel: 'S',
      loc_quadra: 'S',
      loc_portaria: 'N',
    };

    const params: any = { where: { ...where } };

    if (id) {
      params.where = { ...params.where, loc_local: id };
    }
    return params;
  }
}
