import { CronModelClass } from '../../../../parents/cron/cron_model';
import { Injectable } from '@nestjs/common';
import { ServicesService } from 'src/api/routes/services/services.service';
import { ServicosService } from 'src/api/ju/servicos/servicos.service';

@Injectable()
export class ServicesServiceCronModelService extends CronModelClass {
  constructor(
    protected readonly ezoom: ServicesService,
    protected readonly ju: ServicosService,
  ) {
    super(ezoom, ju);
  }

  protected override getQuery(each) {
    return {
      where: {
        ser_servico: each.ser_servico,
      },
    };
  }

  protected override updateQuery(each, data) {
    return {
      where: {
        ser_servico: each.ser_servico,
      },
      data,
    };
  }
}
