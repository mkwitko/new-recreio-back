import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LocationsCronService } from './cron.service';

@Controller('cron/locations')
export class LocationsCronController {
  constructor(private readonly service: LocationsCronService) {}
  select = {
    loc_local: true,
    loc_descricao: true,
    loc_vlraluguel: true,
    loc_idadeinicial: true,
    loc_idadefinal: true,
  };
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  @Get()
  async sync() {
    // Salons
    this.service.sync({
      select: this.select,
      where: {
        loc_locavel: 'S',
        loc_quadra: 'N',
        NOT: {
          loc_servico: 1216,
        },
      },
    });

    // Kiosks
    this.service.sync({
      select: this.select,
      where: {
        loc_locavel: 'S',
        loc_servico: 1216,
      },
    });

    // Fields
    this.service.sync({
      select: this.select,
      where: {
        loc_locavel: 'S',
        loc_quadra: 'S',
        loc_portaria: 'N',
      },
    });
  }
}
