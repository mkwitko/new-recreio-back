import { PricesCronService } from './cron.service';
import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('cron/prices')
export class PricesCronController {
  constructor(private readonly service: PricesCronService) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  @Get()
  async sync() {
    this.service.sync({});
  }
}
