import { Controller } from '@nestjs/common';
import { ClassificationFilterService } from './classifications_filter.service';
import { ControlController } from 'src/parents/routes/control/control.controller';

@Controller('filter')
export class ClassificationFilterController extends ControlController {
  constructor(public classificationFilterService: ClassificationFilterService) {
    super(classificationFilterService);
  }
}
