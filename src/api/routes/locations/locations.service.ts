import { LocalContextService } from './../../../services/local-context/local-context.service';
import { LocationModel } from './model/model.service';
import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class LocationsService {
  constructor(
    public model: LocationModel,
    private local: LocalContextService,
  ) {}
  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }

  //   async attach(location: any) {
  //     const user = await this.local.get('user');
  //     const dependents = await this.local.get('dependents');
  //     const all = [user, ...dependents];
  //     return await all.map((e) => {
  //       e.locations = [];
  //       location.map((each: any) => {
  //         if (each.site_place_ju) {
  //           if (
  //             each.site_place_ju.loc_idadeinicial == null ||
  //             each.site_place_ju.loc_idadefinal == null ||
  //             (each.site_place_ju.loc_idadeinicial <= e.age &&
  //               each.site_place_ju.loc_idadefinal >= e.age)
  //           ) {
  //             e.locations.push(each);
  //           }
  //         } else {
  //           if (
  //             each.loc_idadeinicial == null ||
  //             each.loc_idadefinal == null ||
  //             (each.loc_idadeinicial <= e.age && each.loc_idadefinal >= e.age)
  //           ) {
  //             e.locations.push(each);
  //           }
  //         }
  //       });
  //       return e;
  //     });
  //   }
}
