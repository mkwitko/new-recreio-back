import { ControlController } from 'src/parents/routes/control/control.controller';
import { Controller } from '@nestjs/common';
import { GuestsService } from './guests.service';

@Controller('guest')
export class GuestsController extends ControlController {
  constructor(public guestsService: GuestsService) {
    super(guestsService);
  }
}
