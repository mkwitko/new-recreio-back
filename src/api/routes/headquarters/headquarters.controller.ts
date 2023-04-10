import { Controller } from '@nestjs/common';
import { HeadquartersService } from './headquarters.service';
import { ControlController } from 'src/parents/routes/control/control.controller';

@Controller('headquarters')
export class HeadquartersController extends ControlController {
  constructor(public headquartersService: HeadquartersService) {
    super(headquartersService);
  }
}
