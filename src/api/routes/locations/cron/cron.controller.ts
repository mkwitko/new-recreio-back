import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LocationsService } from '../locations.service';

@Controller('cron/locations')
export class CronLocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Cron(CronExpression.EVERY_HOUR)
  @Get()
  async sync() {
    this.locationsService.salons.sync();
    this.locationsService.kiosks.sync();
  }
}
