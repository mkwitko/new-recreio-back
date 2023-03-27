import { SlugifyModule } from './../../../services/slugify/slugify.module';
import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationModel } from './model/model.service';
import { AlsModule } from 'src/services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AlsModule, SlugifyModule],
  controllers: [LocationsController],
  providers: [LocationsService, LocationModel],
  exports: [LocationsService, LocationModel],
})
export class LocationsModule {}
