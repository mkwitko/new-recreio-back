import { CronClass } from './../../../parents/cron/cron';
import { Injectable } from '@nestjs/common';
import { UsersCronModelService } from './model/model.service';

@Injectable()
export class UsersCronService extends CronClass {
  constructor(protected model: UsersCronModelService) {
    super(model);
  }
}
