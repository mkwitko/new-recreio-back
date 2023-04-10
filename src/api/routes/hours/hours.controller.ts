import { HoursService } from './hours.service';
import { ControlController } from 'src/parents/routes/control/control.controller';
import { Controller } from '@nestjs/common';

@Controller('hours')
export class HoursController extends ControlController {
  constructor(public service: HoursService) {
    super(service);
  }
}
