import { CronClass } from '../../../parents/cron/cron';
import { Injectable } from '@nestjs/common';
import { ClassificacoesServiceCronModelService } from './model/model.service';

@Injectable()
export class ClassificacoesCronService extends CronClass {
  constructor(protected model: ClassificacoesServiceCronModelService) {
    super(model);
  }
}
