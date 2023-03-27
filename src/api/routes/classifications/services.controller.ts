import { Controller } from '@nestjs/common';
import { ClassificationService } from './services.service';

@Controller('services')
export class ClassificationController {
  constructor(private readonly servicesService: ClassificationService) {}
}
