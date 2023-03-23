import { CronLocationsController } from './cron/cron.controller';
import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationModel } from './model/model.service';
import { AlsModule } from 'src/services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { FieldsService } from './where/fields/fields.service';
import { SalonsService } from './where/salons/salons.service';
import { KiosksService } from './where/kiosks/kiosks.service';
import { FitnessService } from './where/fitness/fitness.service';

@Module({
  imports: [PrismaModule, AlsModule],
  controllers: [LocationsController, CronLocationsController],
  providers: [
    LocationsService,
    LocationModel,
    FieldsService,
    SalonsService,
    KiosksService,
    FitnessService,
  ],
  exports: [LocationsService, LocationModel],
})
export class LocationsModule {}
