import { CronModelClass } from '../../../../parents/cron/cron_model';
import { Injectable } from '@nestjs/common';
import { ClassificacoesService } from 'src/api/ju/classificacoes/classificacoes.service';
import { ClassificationService } from 'src/api/routes/classifications/services.service';

@Injectable()
export class ClassificacoesServiceCronModelService extends CronModelClass {
  constructor(
    protected readonly ezoom: ClassificationService,
    protected readonly ju: ClassificacoesService,
  ) {
    super(ezoom, ju);
  }

  protected override updateQuery(each, data): any {
    return {
      where: {
        cla_classificacao: each.cla_classificacao,
      },
      data,
    };
  }
}
