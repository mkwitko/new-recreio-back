import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('fields')
  async fields(@Query() query: { id: string }) {
    const params = await this.locationsService.fields.call(query.id);
    const result = await this.locationsService.get_ju(params);
    return await this.locationsService.attach(result);
  }

  @Get('salons')
  async salons(@Query() query: { id: string }) {
    const params = await this.locationsService.salons.call(query.id);
    const result = await this.locationsService.get(params);
    return await this.locationsService.attach(result);
  }

  @Get('kiosks')
  async kiosks(@Query() query: { id: string }) {
    const params = await this.locationsService.kiosks.call(query.id);
    const result = await this.locationsService.get(params);
    return await this.locationsService.attach(result);
  }

  @Get('fitness')
  async fitness(@Query() query: { id: string }) {
    const params = await this.locationsService.fitness.call(query.id);
    const result = await this.locationsService.get(params);
    return result;
    // return await this.locationsService.attach(result);
  }
}
