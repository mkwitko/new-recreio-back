import { ControlController } from 'src/parents/routes/control/control.controller';
import { Controller } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('config')
export class ConfigController extends ControlController {
  constructor(public configService: ConfigService) {
    super(configService);
  }
}
