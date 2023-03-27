import { ServicesCronService } from './cron.service';
import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('cron/services')
export class ServiceCronController {
  constructor(private readonly service: ServicesCronService) {}
  select = {
    ser_servico: true,
    ser_descricao: true,
    ser_abreviatura: true,
    ser_classificacao: true,
    ser_bloqatraso: true,
    ser_diasbloqatraso: true,
    ser_gerardebito: true,
    ser_ativo: true,
    ser_considerarparadesconto: true,
    ser_idadeini: true,
    ser_idadefim: true,
    ser_permitecontratacao: true,
    ser_contratasemlimite: true,
  };
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  @Get()
  async sync() {
    this.service.sync({
      select: this.select,
      where: {
        ser_permitecontratacao: 'S',
      },
    });
  }
}
