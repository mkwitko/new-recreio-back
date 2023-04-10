import { HorariosService } from 'src/api/ju/horarios/horarios.service';
import { CronModelClass } from '../../../../parents/cron/cron_model';
import { Injectable } from '@nestjs/common';
import { HoursService } from 'src/api/routes/hours/hours.service';

@Injectable()
export class HoursCronModelService extends CronModelClass {
  constructor(
    protected readonly ezoom: HoursService,
    protected readonly ju: HorariosService,
  ) {
    super(ezoom, ju);
  }

  protected override getQuery(each) {
    return {
      where: {
        hor_idhorario: each.hor_idhorario,
      },
    };
  }

  protected override updateQuery(each, data) {
    return {
      where: {
        hor_idhorario: each.hor_idhorario,
      },
      data,
    };
  }
}
