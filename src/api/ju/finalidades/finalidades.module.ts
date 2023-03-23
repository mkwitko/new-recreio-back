import { FinalidadesService } from './finalidades.service';
import { FinalidadesModelService } from './model/model.service';
import { AlsModule } from '../../../services/local-context/als.module';
import { PrismaModule } from 'src/shared_module/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, AlsModule],
  providers: [FinalidadesModelService, FinalidadesService],
  exports: [FinalidadesModelService, FinalidadesService],
})
export class FinalidadesModule {}
