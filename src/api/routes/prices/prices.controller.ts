import { PricesService } from './prices.service';
import { ControlController } from 'src/parents/routes/control/control.controller';
import { Controller } from '@nestjs/common';

@Controller('prices')
export class PricesController extends ControlController {
  constructor(public service: PricesService) {
    super(service);
  }
}
