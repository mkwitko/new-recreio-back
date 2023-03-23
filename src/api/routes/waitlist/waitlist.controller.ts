import { Controller, Get, Query } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  //   @Get()
  //   index(@Query() query: { service_id: number }) {
  //     if (query.service_id) return this.waitlistService.details(query.service_id);
  //     else return this.waitlistService.list();
  //   }
}
