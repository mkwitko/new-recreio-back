import { LocationsModule } from './../../routes/locations/locations.module';
import { LocaisModule } from './../../ju/locais/locais.module';
import { Module } from '@nestjs/common';
import { LocationsCronController } from './cron.controller';
import { LocationsCronService } from './cron.service';
import { LocationsCronModelService } from './model/model.service';

@Module({
  imports: [LocationsModule, LocaisModule],
  controllers: [LocationsCronController],
  providers: [LocationsCronService, LocationsCronModelService],
  exports: [LocationsCronService, LocationsCronModelService],
})
export class LocationsCronModule {}
