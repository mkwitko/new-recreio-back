import { HoursCronService } from './cron.service';
import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('cron/hours')
export class HoursCronController {
  constructor(private readonly service: HoursCronService) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  @Get()
  async sync() {
    this.service.sync({});
  }
}
