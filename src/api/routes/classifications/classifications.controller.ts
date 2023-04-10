import { Controller } from '@nestjs/common';
import { ClassificationService } from './classifications.service';
import { ControlController } from 'src/parents/routes/control/control.controller';

@Controller('classifications')
export class ClassificationController extends ControlController {
  constructor(public classificationService: ClassificationService) {
    super(classificationService);
  }

  override include() {
    return {
      include: {
        app_service_category_description: true,
        app_service_category_gallery: true,
        app_service_category_ju: {
          include: {
            app_services_ju: {
              include: {
                app_prices_ju: true,
                app_hours_ju: true,
              },
            },
            app_service_classifications_ju: true,
          },
        },
      },
    };
  }
}
