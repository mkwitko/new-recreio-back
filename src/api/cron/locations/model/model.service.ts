import { LocaisService } from './../../../ju/locais/locais.service';
import { LocationsService } from './../../../routes/locations/locations.service';
import { CronModelClass } from '../../../../parents/cron/cron_model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationsCronModelService extends CronModelClass {
  override table = 'site_place_ju';
  constructor(
    protected readonly ezoom: LocationsService,
    protected readonly ju: LocaisService,
  ) {
    super(ezoom, ju);
    Object.assign(this.custom, (this.custom.customObj.customInsert = true));
  }

  protected override getQuery(each) {
    return {
      where: {
        loc_local: each.loc_local,
      },
    };
  }

  protected override updateQuery(each, data) {
    return {
      where: {
        loc_local: each.loc_local,
      },
      data,
    };
  }
}
