import { ControlController } from 'src/parents/routes/control/control.controller';
import { Controller } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController extends ControlController {
  constructor(public servicesService: ServicesService) {
    super(servicesService);
  }

  override include() {
    return {
      include: {
        app_prices_ju: true,
        app_hours_ju: true,
      },
    };
  }
}
