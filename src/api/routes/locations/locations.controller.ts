import { Controller, Get, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ControlController } from 'src/parents/routes/control/control.controller';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Controller('locations')
export class LocationsController extends ControlController {
  constructor(protected locationsService: LocationsService) {
    super(locationsService);
  }

  @Get()
  override async get(@Query() query) {
    const params: ParamsInterface = {};
    Object.keys(query).forEach((e) => {
      params.where = { ...params.where, [e]: query[e] };
    });

    params.include = {
      site_place_discount: true,
      site_place_gallery: true,
      site_place_description: true,
      site_place_ju: true,
    };
    return await this.service.get(params);
  }
}
