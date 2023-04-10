import { CronClass } from '../../../parents/cron/cron';
import { Injectable } from '@nestjs/common';
import { PricesCronModelService } from './model/model.service';

@Injectable()
export class PricesCronService extends CronClass {
  constructor(protected model: PricesCronModelService) {
    super(model);
  }
}
