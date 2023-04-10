import { CronClass } from '../../../parents/cron/cron';
import { Injectable } from '@nestjs/common';
import { HoursCronModelService } from './model/model.service';

@Injectable()
export class HoursCronService extends CronClass {
  constructor(protected model: HoursCronModelService) {
    super(model);
  }
}
