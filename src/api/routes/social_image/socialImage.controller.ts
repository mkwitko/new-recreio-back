import { SocialImageService } from './socialImage.service';
import { ControlController } from 'src/parents/routes/control/control.controller';
import { Controller } from '@nestjs/common';

@Controller('social')
export class SocialImageController extends ControlController {
  constructor(public service: SocialImageService) {
    super(SocialImageService);
  }
}
