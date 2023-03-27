import { CronClass } from '../../../parents/cron/cron';
import { Injectable } from '@nestjs/common';
import { LocationsCronModelService } from './model/model.service';

@Injectable()
export class LocationsCronService extends CronClass {
  constructor(protected model: LocationsCronModelService) {
    super(model);
  }
}
