import { Controller } from '@nestjs/common';
import { ClassificationService } from './services.service';

@Controller('classifications')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}
}
