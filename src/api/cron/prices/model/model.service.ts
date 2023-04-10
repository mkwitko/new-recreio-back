import { CronModelClass } from '../../../../parents/cron/cron_model';
import { Injectable } from '@nestjs/common';
import { PrecosService } from 'src/api/ju/precos/precos.service';
import { PricesService } from 'src/api/routes/prices/prices.service';

@Injectable()
export class PricesCronModelService extends CronModelClass {
  constructor(
    protected readonly ezoom: PricesService,
    protected readonly ju: PrecosService,
  ) {
    super(ezoom, ju);
  }

  protected override getQuery(each) {
    return {
      where: {
        pre_idprecos: each.pre_idprecos,
      },
    };
  }

  protected override updateQuery(each, data) {
    return {
      where: {
        pre_idprecos: each.pre_idprecos,
      },
      data,
    };
  }
}
