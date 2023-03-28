import { ClassificacoesCronService } from './cron.service';
import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('cron/classificacoes')
export class ClassificacoesCronController {
  constructor(private readonly service: ClassificacoesCronService) {}
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  @Get()
  async sync() {
    this.service.sync({});
  }
}
