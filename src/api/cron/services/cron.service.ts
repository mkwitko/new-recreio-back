import { CronClass } from '../../../parents/cron/cron';
import { Injectable } from '@nestjs/common';
import { ServicesServiceCronModelService } from './model/model.service';

@Injectable()
export class ServicesCronService extends CronClass {
  constructor(protected model: ServicesServiceCronModelService) {
    super(model);
  }
}
